import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { FacebookMessengerEvent, send } from '@/utils/facebook-messenger-api-client';

export function say<T extends FacebookMessengerEvent>(
  messageOrFn: string | ((ev: T) => string | Promise<string>),
) {
  return (source: Observable<T>) =>
    source.pipe(
      mergeMap(async ev => {
        const message = typeof messageOrFn === 'function' ? await messageOrFn(ev) : messageOrFn;
        await send({ message: { text: message } }, { senderId: ev.sender.id });
        return ev;
      }),
    );
}
