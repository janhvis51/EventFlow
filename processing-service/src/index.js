require("dotenv").config();

const mongoose = require("mongoose");
const { startConsumer } = require("./kafka/consumer");

async function startApplication() {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        await startConsumer();

    } catch (error) {

        console.error(
            "Failed to start processing service:",
            error
        );

        process.exit(1);
    }
}

startApplication();