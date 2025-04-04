import { kafka } from '../config/kafka.config';

// Create consumer instance
export const kafkaConsumer = kafka.consumer({
    groupId: process.env.KAFKA_CONSUMER_GROUP_ID || 'express-consumer-group',
});

// Subscribe to topic and process messages
const runConsumer = async () => {
    try {
        // Subscribe to topic
        await kafkaConsumer.subscribe({
            topics: [process.env.KAFKA_TOPIC || 'test-topic'],
            fromBeginning: true
        });

        // Process messages
        await kafkaConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = message.value?.toString();

            },
        });
    } catch (error) {
        console.error('Error in Kafka consumer:', error);
    }
};

// Log consumer events (optional, for debugging)
kafkaConsumer.on('consumer.connect', () => {
    runConsumer().catch(console.error);
});

kafkaConsumer.on('consumer.disconnect', () => {
    console.log('Consumer disconnected');
});

kafkaConsumer.on('consumer.crash', (error) => {
    console.error('Consumer crashed:', error);
}); 