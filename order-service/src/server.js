require("dotenv").config();

const app = require("./app");
const { connectProducer } = require("./kafka/producer");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {

        await connectDB();

        await connectProducer();

        app.listen(PORT, () => {
            console.log(`Order service running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start order service:", error);
        process.exit(1);
    }
}

startServer();