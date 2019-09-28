import fastify from 'fastify';

import logger from '@/utils/logger';
import { event$ } from '@/observables';
import { globalConfig } from './botstream';

const app = fastify({ logger, disableRequestLogging: true });

app.get('/api/messages', (req, reply) => {
  // Parse params from the webhook verification request
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === globalConfig.facebookVerifyToken) {
      // Respond with 200 OK and challenge token from the request
      reply.send(challenge);
      return;
    }
  }

  reply.status(403);
});

app.post('/api/messages', (req, reply) => {
  // Parse the request body from the POST
  const body = req.body;

  // Return a '404 Not Found' if event is not from a page subscription
  if (body.object !== 'page' || !body.entry) {
    reply.status(404);
    return;
  }

  body.entry.forEach((entry: any) => {
    const webhookEvent = entry.messaging[0];
    logger.info(webhookEvent, 'Webhook Event');
    event$.next(webhookEvent);
  });

  reply.send();
});

export default app;
