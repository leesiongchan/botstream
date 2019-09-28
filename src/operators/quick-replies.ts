import { Observable } from 'rxjs';
import { filter, mergeMap, switchMap, take } from 'rxjs/operators';
import { get } from 'lodash';

import { event$ } from '@/observables';
import { FacebookMessengerEvent, send } from '@/utils/facebook-messenger-api-client';

export function sendQuickReplies<T extends FacebookMessengerEvent>(
  messageOrFn: string | ((ev: T) => string),
  quickReplies: any[],
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
      switchMap(quickReplyPayloads => {
        return event$.pipe(
          filter(ev => quickReplyPayloads.includes(get(ev, 'message.quick_reply.payload')), take(1)),
        );
      }),
    );
}
