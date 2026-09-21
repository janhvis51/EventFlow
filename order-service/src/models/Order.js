const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true
        },

        customerName: String,
        product: String,
        quantity: Number,
        amount: Number,
        createdAt: Date,
        processedAt: Date,
        status: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);