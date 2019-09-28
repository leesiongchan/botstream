import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { get } from 'lodash';

import { FacebookMessengerEvent } from '../utils/facebook-messenger-api-client';

export function hears<T extends FacebookMessengerEvent>(
  rawKeywords: string | string[],
  eventType?: 'message' | 'postback',
) {
  return (source: Observable<T>) =>
    source.pipe(
      filter(ev => {
        if (eventType === 'message' && !ev.message) {
          return false;
        } else if (eventType === 'postback' && !ev.postback) {
          return false;
        }
        const value: string | undefined = get(ev, 'postback.payload') || get(ev, 'message.text');
        if (!value) {
          return false;
        }
        const keywords = Array.isArray(rawKeywords) ? rawKeywords : [rawKeywords];
        return keywords.some(keyword => value.toLowerCase().includes(keyword.toLowerCase()));
      }),
    );
}
