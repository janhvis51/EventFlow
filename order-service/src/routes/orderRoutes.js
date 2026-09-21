const express = require("express");
const crypto = require("crypto");
const Order = require("../models/Order");
const { publishOrder } = require("../kafka/producer");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {
            customerName,
            product,
            quantity,
            amount
        } = req.body;

        if (!customerName || !product || !quantity || !amount) {
            return res.status(400).json({
                message: "All order fields are required"
            });
        }

        const order = {
            orderId: crypto.randomUUID(),
            customerName,
            product,
            quantity,
            amount,
            createdAt: new Date().toISOString()
        };

        await publishOrder(order);

        res.status(202).json({
            message: "Order accepted for processing",
            order
        });

    } catch (error) {
        console.error("Order creation failed:", error);

        res.status(500).json({
            message: "Failed to publish order"
        });
    }
});
router.get("/", async (req, res) => {
    try {
        const orders = await Order
            .find()
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        console.error("Failed to fetch orders:", error);

        res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
});

module.exports = router;