import { Request, Response } from 'express';
import { kafkaProducer } from '../services/kafka.producer';

/**
 * Processes incoming webhook events from Meta platforms
 */
export const processTelegramWebhook = async (req: Request, res: Response) => {
    const body = req.body;
    const currentTime = new Date().toISOString();

    await kafkaProducer.send({
        topic: "telegram-hook",
        messages: [{ value: JSON.stringify(body) }],
    }).then((result) => {
        res.send(
            {
                topic: "telegram-hook",
                messages: [{ value: JSON.stringify(body) }],
            }
        )
    }).catch((err) => {
        res.sendStatus(500);
    });

}; 