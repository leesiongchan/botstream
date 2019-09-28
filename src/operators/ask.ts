import { Observable } from 'rxjs';
import { switchMapTo, take } from 'rxjs/operators';

import { FacebookMessengerEvent } from '../utils/facebook-messenger-api-client';
import { event$ } from '../observables';
import { say } from './say';

export function ask<T extends FacebookMessengerEvent>(message: string | ((ev: T) => string)) {
  return (source: Observable<T>) =>
    source.pipe(
      say(message),
      switchMapTo(event$.pipe(take(1))),
    );
}
