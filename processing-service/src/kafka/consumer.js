const { Kafka } = require("kafkajs");
const Order = require("../models/Order");

const kafka = new Kafka({
    clientId: "processing-service",
    brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({
    groupId: "order-processing-group"
});

async function startConsumer() {
    await consumer.connect();

    await consumer.subscribe({
        topic: "order-created",
        fromBeginning: true
    });

    console.log("Kafka Consumer Connected");

    await consumer.run({
        eachBatch: async ({
            batch,
            resolveOffset,
            heartbeat
        }) => {

            const orders = batch.messages.map((message) => {
                return JSON.parse(message.value.toString());
            });

            if (orders.length === 0) {
                return;
            }

            console.log(`Received batch of ${orders.length} orders`);

            try {

                await Order.insertMany(orders, {
                    ordered: false
                });

                console.log(
                    `Inserted ${orders.length} orders into MongoDB`
                );

                for (const message of batch.messages) {
                    resolveOffset(message.offset);
                    await heartbeat();
                }

            } catch (error) {
                console.error(
                    "Batch processing failed:",
                    error
                );
            }
        }
    });
}

module.exports = {
    startConsumer
};