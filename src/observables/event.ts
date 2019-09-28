import { Observable, Subject } from 'rxjs';
import { filter, shareReplay } from 'rxjs/operators';

import {
  FacebookMessengerEvent,
  FacebookMessengerMessageEvent,
  FacebookMessengerPostbackEvent,
} from '@/utils/facebook-messenger-api-client';

export const event$ = new Subject<FacebookMessengerEvent>();
export const eventReplay$ = event$.pipe(shareReplay(1));

export const messageEvent$ = event$.pipe(filter(ev => !!ev.message)) as Observable<FacebookMessengerMessageEvent>;
export const postbackEvent$ = event$.pipe(filter(ev => !!ev.postback)) as Observable<
  FacebookMessengerPostbackEvent
>;
