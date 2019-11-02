import { Observable } from 'rxjs';
import { first, mergeMap, switchMapTo } from 'rxjs/operators';

import { FacebookMessengerEvent, FacebookQuickReply, send } from '../utils/facebook-messenger-api-client';
import { event$ } from '../observables';

export function sendQuickReplies<T extends FacebookMessengerEvent>(
  messageOrFn: string | ((ev: T) => string),
  quickReplies: FacebookQuickReply[],
) {
  return (source: Observable<T>) =>
    source.pipe(
      mergeMap(async ev => {
        const message = typeof messageOrFn === 'function' ? messageOrFn(ev) : messageOrFn;
        await send(
          { message: { text: message, quick_replies: quickReplies }, messaging_type: 'RESPONSE' },
          { senderId: ev.sender.id },
        );
        return quickReplies.map(quickReply => quickReply.payload);
      }),
      switchMapTo(event$.pipe(first())),
    );
}
