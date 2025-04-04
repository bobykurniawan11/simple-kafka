import { kafka } from '../config/kafka.config';

// Create producer instance
export const kafkaProducer = kafka.producer();

// Log producer events (optional, for debugging)
kafkaProducer.on('producer.connect', () => {
    console.log('Producer connected');
});

kafkaProducer.on('producer.disconnect', () => {
    console.log('Producer disconnected');
});

kafkaProducer.on('producer.network.request_timeout', (payload) => {
    console.error('Producer request timeout:', payload);
}); 