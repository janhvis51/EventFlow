const express = require("express");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/orders", orderRoutes);

app.get("/health", (req, res) => {
    res.json({
        service: "order-service",
        status: "UP"
    });
});

module.exports = app;