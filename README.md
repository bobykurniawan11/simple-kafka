# Express TypeScript Kafka.js Docker App

A simple Express TypeScript application with Kafka.js integration, dockerized for easy setup and deployment.

## Features

- Express.js with TypeScript
- Kafka.js for Kafka integration
- Docker and Docker Compose setup
- Producer and Consumer implementation

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

## Getting Started

### Using Docker (Production)

1. Clone this repository
2. Run the application in production mode:

```bash
docker-compose up app
```

The application will be available at http://localhost:3000

### Using Docker (Development with Hot Reloading)

For development with hot reloading of TypeScript files:

```bash
docker-compose up app-dev
```

### Local Development

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## API Endpoints

- `GET /`: Simple health check endpoint
- `POST /api/messages`: Send a message to Kafka
  - Request body: `{ "message": "Your message" }`
- `GET /api/webhook`: Meta webhook verification endpoint
- `POST /api/webhook`: Meta webhook event receiving endpoint (Facebook, Instagram, WhatsApp)

## Environment Variables

See `.env.example` for available environment variables.

### Meta Webhook Setup

To configure Meta webhooks:

1. Set a secure random string as your `META_WEBHOOK_VERIFY_TOKEN` in the `.env` file
2. Configure your Meta app to use `https://your-domain.com/api/webhook` as the webhook URL
3. Use the same verification token you set in your `.env` file
4. Subscribe to the events you want to receive (messages, feed updates, etc.)

## Docker Services

- `app`: Express TypeScript application
- `zookeeper`: Zookeeper service for Kafka
- `kafka`: Kafka broker

## License

MIT
