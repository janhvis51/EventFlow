const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true
        },

        customerName: {
            type: String,
            required: true
        },

        product: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        createdAt: {
            type: Date,
            required: true
        },

        processedAt: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            default: "COMPLETED"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);