import { useState } from "react";
import axios from "axios";

function OrderForm({ onOrderCreated }) {
    const [formData, setFormData] = useState({
        customerName: "",
        product: "",
        quantity: 1,
        amount: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/orders",
                {
                    ...formData,
                    quantity: Number(formData.quantity),
                    amount: Number(formData.amount)
                }
            );

            setMessage(response.data.message);

            onOrderCreated();

            setFormData({
                customerName: "",
                product: "",
                quantity: 1,
                amount: ""
            });

        } catch (error) {
            console.error(error);
            setMessage("Failed to create order");
        }
    };

    return (
        <div>
            <h2>Create Order</h2>

            <form
                className="order-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="customerName"
                    placeholder="Customer Name"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="product"
                    placeholder="Product"
                    value={formData.product}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Create Order
                </button>

            </form>

            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}
        </div>
    );
}

export default OrderForm;