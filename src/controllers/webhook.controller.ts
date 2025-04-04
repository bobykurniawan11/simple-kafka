import { Request, Response } from 'express';
import { kafkaProducer } from '../services/kafka.producer';

/**
 * Handles Meta webhook verification
 * @see https://developers.facebook.com/docs/graph-api/webhooks/getting-started
 */
export const verifyWebhook = (req: Request, res: Response) => {
    const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN;

    // Parse params from the verification request
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check if a token and mode were sent
    if (mode && token) {
        // Check the mode and token sent match your configuration
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Respond with 200 OK and challenge token
            res.status(200).send(challenge);
        } else {
            // Respond with 403 Forbidden if verify tokens do not match
            res.sendStatus(403);
        }
    } else {
        // Respond with 400 Bad Request if missing parameters
        res.sendStatus(400);
    }
};

/**
 * Processes incoming webhook events from Meta platforms
 */
export const processWebhook = async (req: Request, res: Response) => {
    const body = req.body;

    await kafkaProducer.send({
        topic: process.env.KAFKA_TOPIC || 'meta-webhook-topic',
        messages: [{ value: JSON.stringify(body) }],
    }).then((result) => {
        res.send(
            {
                topic: process.env.KAFKA_TOPIC || 'meta-webhook-topic',
                messages: [{ value: JSON.stringify(body) }],
            }
        )
    }).catch((err) => {
        res.sendStatus(500);
    });


}; 