import { Request, Response } from 'express';
import { kafkaProducer } from '../services/kafka.producer';

/**
 * Processes incoming webhook events from Meta platforms
 */
export const processWahaWebhook = async (req: Request, res: Response) => {
    const body = req.body;
    const currentTime = new Date().toISOString();
        console.log(`Received webhook event at ${currentTime}:`, body);

    await kafkaProducer.send({
        topic: "waha-hook",
        messages: [{ value: JSON.stringify(body) }],
    }).then((result) => {
        res.send(
            {
                topic: "waha-hook",
                messages: [{ value: JSON.stringify(body) }],
            }
        )
    }).catch((err) => {
        res.sendStatus(500);
    });

}; 