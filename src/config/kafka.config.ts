import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

// Kafka configuration
const brokers = (process.env.KAFKA_BROKERS || 'localhost:9092').split(',');

export const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'express-kafka-app',
    brokers,
    retry: {
        initialRetryTime: 100,
        retries: 8
    }
}); 