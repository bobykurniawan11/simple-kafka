import express from 'express';
import dotenv from 'dotenv';
import { kafka } from './config/kafka.config';
import { kafkaProducer } from './services/kafka.producer';
import { kafkaConsumer } from './services/kafka.consumer';
import webhookRoutes from './routes/webhook.routes';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', webhookRoutes);



app.get('/api/env-vars', (req, res) => {
    res.json(process.env)
});

// Send message route
app.post('/api/messages', async (req, res) => {
    try {
        const { message } = req.body;
        await kafkaProducer.send({
            topic: process.env.KAFKA_TOPIC || 'meta-webhook-topic',
            messages: [{ value: JSON.stringify({ message }) }],
        });
        res.json({ success: true, message: 'Message sent to Kafka' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
});

// Create Meta webhook consumer
const metaWebhookConsumer = kafka.consumer({
    groupId: process.env.KAFKA_META_CONSUMER_GROUP_ID || 'meta-webhook-consumer-group',
});

// Process Meta platform events
const processMetaEvent = async (topic: string, data: any) => {
    const platform = data.platform;
    const payload = data.payload;


    // Add your platform-specific processing logic here
    // You can extend this with more complex handling for each platform
};

// Setup and run Meta webhook consumer
const setupMetaConsumer = async () => {
    await metaWebhookConsumer.connect();
    await metaWebhookConsumer.subscribe({
        topics: [process.env.KAFKA_TOPIC || 'meta-webhook-topic'],
        fromBeginning: true
    });

    await metaWebhookConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = message.value?.toString();

            if (value) {
                try {
                    const data = JSON.parse(value);
                } catch (error) {
                    console.error('Error processing Meta webhook message:', error);
                }
            }
        },
    });
};

// Start server
app.listen(PORT, () => {

    // Connect to Kafka
    try {
        kafkaProducer.connect();
        // kafkaConsumer.connect();
        setupMetaConsumer();
    } catch (error) {
        throw error;
    }
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    try {
        await kafkaProducer.disconnect();
        // await kafkaConsumer.disconnect();
        await metaWebhookConsumer.disconnect();
        console.log('Kafka connections closed');
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
}); 