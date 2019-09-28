import got from 'got';

import logger from './logger';
import { globalConfig } from '@/botstream';

export interface FacebookMessengerMessage {
  text: string;
}

export interface FacebookMessengerPostbackMessage {
  payload: any;
}

export interface FacebookMessengerSender {
  id: string;
}

export interface FacebookMessengerEvent {
  message?: FacebookMessengerMessage;
  postback?: FacebookMessengerPostbackMessage;
  sender: FacebookMessengerSender;
}

export interface FacebookMessengerMessageEvent extends FacebookMessengerEvent {
  message: FacebookMessengerMessage;
}

export interface FacebookMessengerPostbackEvent extends FacebookMessengerEvent {
  postback: FacebookMessengerPostbackMessage;
}

export function send(query: {}, { senderId }: { senderId: string }) {
  const apiVersion = globalConfig.facebookApiVersion || 'v4.0';
  const apiEndpoint = `https://graph.facebook.com/${apiVersion}/me/messages`;

  const body = {
    recipient: {
      id: senderId,
    },
    ...query,
  };

  return got(apiEndpoint, {
    body,
    json: true,
    method: 'POST',
    query: { access_token: globalConfig.facebookAccessToken },
  })
    .then(res => res.body)
    .catch(err => {
      logger.error(err.body.error);
    });
}
