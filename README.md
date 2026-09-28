# EventFlow – Event-Driven Order Processing System

EventFlow is an event-driven order processing system built using React.js, Node.js, Express.js, MongoDB, Apache Kafka, Docker, and Docker Compose.

The system demonstrates asynchronous communication between services using Kafka instead of directly coupling order creation with database persistence.



## Architecture


                    ┌───────────────┐
                    │    React      │
                    │   Frontend    │
                    │   Port 3000   │
                    └───────┬───────┘
                            │
                            │ HTTP POST
                            ▼
                    ┌───────────────┐
                    │ Order Service │
                    │   Express.js  │
                    │   Port 5000   │
                    └───────┬───────┘
                            │
                            │ Publish Order Event
                            ▼
                    ┌───────────────┐
                    │     Kafka     │
                    │   orders      │
                    │    topic      │
                    └───────┬───────┘
                            │
                            │ Consume Event
                            ▼
                 ┌──────────────────────┐
                 │ Processing Service   │
                 │      Node.js         │
                 └──────────┬───────────┘
                            │
                            │ Persist Order
                            ▼
                    ┌───────────────┐
                    │    MongoDB    │
                    │   eventflow   │
                    └───────────────┘
## How It Works

1. The user creates an order through the React frontend.
2. The frontend sends the order to the Order Service using a REST API.
3. The Order Service publishes an order event to the Kafka `orders` topic.
4. The Processing Service consumes the event asynchronously.
5. The Processing Service persists the processed order in MongoDB.
6. The frontend can retrieve the stored orders through the Order Service.

## Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- REST APIs

### Messaging
- Apache Kafka
- KafkaJS

### Database
- MongoDB
- Mongoose

### Infrastructure
- Docker
- Docker Compose

## Project Structure

EventFlow/
├── frontend/
├── order-service/
├── processing-service/
├── docker-compose.yml
├── .gitignore
└── README.md
