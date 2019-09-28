import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { FacebookMessengerEvent, send } from '@/utils/facebook-messenger-api-client';

export function showSenderAction<T extends FacebookMessengerEvent>(
  action: 'mark_seen' | 'typing_on' | 'typing_off',
) {
  return (source: Observable<T>) =>
    source.pipe(
      mergeMap(async ev => {
        await send({ sender_action: action }, { senderId: ev.sender.id });
        return ev;
      }),
    );
}
