import { useEffect, useState } from "react";
import axios from "axios";

function OrderList({ refreshOrders }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/orders"
            );

            setOrders(response.data);

        } catch (error) {
            console.error(
                "Failed to fetch orders:",
                error
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [refreshOrders]);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <div>
            <h2>Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="orders">

                    {orders.map((order) => (
                        <div
                            className="order"
                            key={order.orderId}
                        >
                            <h3>{order.product}</h3>

                            <p>
                                Customer:{" "}
                                {order.customerName}
                            </p>

                            <p>
                                Quantity:{" "}
                                {order.quantity}
                            </p>

                            <p>
                                Amount: ₹{order.amount}
                            </p>

                            <span className="status">
                                {order.status}
                            </span>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}

export default OrderList;