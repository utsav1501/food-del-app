import express, { Router } from 'express'
import { handleStripeWebhook } from '../controllers/webhook.controller.js'

const WebHookRouter=express.Router();

WebHookRouter.post('/',handleStripeWebhook);
export default WebHookRouter;