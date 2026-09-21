const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "order-service",
    brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();

async function connectProducer() {
    await producer.connect();
    console.log("Kafka Producer Connected");
}

async function publishOrder(order) {
    await producer.send({
        topic: "order-created",
        messages: [
            {
                key: order.orderId,
                value: JSON.stringify(order)
            }
        ]
    });

    console.log(`Order event published: ${order.orderId}`);
}

module.exports = {
    connectProducer,
    publishOrder
};