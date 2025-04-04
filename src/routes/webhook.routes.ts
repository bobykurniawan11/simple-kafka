import { Router } from 'express';
import { verifyWebhook, processWebhook } from '../controllers/webhook.controller';

const router = Router();

// Webhook verification endpoint (GET)
router.get('/webhook', verifyWebhook);

// Webhook event receiving endpoint (POST)
router.post('/webhook', processWebhook);

export default router; 