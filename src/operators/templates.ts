import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { FacebookMessengerEvent, send } from '../utils/facebook-messenger-api-client';

function composeTemplate(template: {}) {
  return {
    message: {
      attachment: {
        payload: template,
        type: 'template',
      },
    },
  };
}

export function sendGenericTemplate<T extends FacebookMessengerEvent>(
  templateOrFn: {} | ((ev: T) => {} | Promise<{}>),
) {
  return (source: Observable<T>) =>
    source.pipe(
      mergeMap(async ev => {
        const template = typeof templateOrFn === 'function' ? await templateOrFn(ev) : templateOrFn;
        await send(
          composeTemplate({
            ...template,
            template_type: 'generic',
          }),
          { senderId: ev.sender.id },
        );
        return ev;
      }),
    );
}

export function sendButtonTemplate<T extends FacebookMessengerEvent>(templateOrFn: {}) {
  return (source: Observable<T>) =>
    source.pipe(
      mergeMap(async ev => {
        const template = typeof templateOrFn === 'function' ? await templateOrFn(ev) : templateOrFn;
        await send(
          composeTemplate({
            ...template,
            template_type: 'button',
          }),
          { senderId: ev.sender.id },
        );
        return ev;
      }),
    );
}
