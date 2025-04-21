import { Router } from 'express';
import { verifyWebhook, processWebhook } from '../controllers/webhook.controller';
import { processWahaWebhook } from '../controllers/waha.controller';``
const router = Router();

// Webhook verification endpoint (GET)
router.get('/webhook', verifyWebhook);

// Webhook event receiving endpoint (POST)
router.post('/webhook', processWebhook);

router.post('/waha-webhook', processWahaWebhook);
export default router; 