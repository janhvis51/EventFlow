import { useState } from "react";
import "./App.css";

import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

function App() {
    const [refreshOrders, setRefreshOrders] = useState(0);

    const handleOrderCreated = () => {
        setRefreshOrders((prev) => prev + 1);
    };

    return (
        <div className="app">

            <header className="header">
                <h1>EventFlow</h1>
                <p>
                    Event-Driven Order Processing System
                </p>
            </header>

            <div className="order-section">

                <div className="card">
                    <OrderForm
                        onOrderCreated={handleOrderCreated}
                    />
                </div>

                <div className="card">
                    <OrderList
                        refreshOrders={refreshOrders}
                    />
                </div>

            </div>

        </div>
    );
}

export default App;