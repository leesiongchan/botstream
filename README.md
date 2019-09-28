# botstream

Facebook Messenger + RxJS + xstate = botstream (POC)

## Motivation

WIP

## Usage

```javascript
import botstream, { messageEvent$ } from '@leesiongchan/botstream';

const bot = botstream({
    facebookAccessToken: '1234',
    facebookApiVersion: 'v4', // Optional, default = 'v4'
    facebookVerifyToken: '2345',
    port: 3000,
});

const echoConvo$ = messageEvent$.pipe(say(ev => `Echo: ${ev.message.text}`));
const helloConvo$ = event$.pipe(
    hears(['hello'], 'message'),
    say('Ok, hello! How can I help you?'),
);

bot.loadSkills(echoConvo$, helloConvo$);
```

## APIs

### botstream

-   `botstream(config: BotstreamConfig)`
-   `loadSkills(skills: Observable[]): void`
-   `server`
    A Fastify server.

### Observables

-   `event$`
-   `eventReplay$`
-   `messageEvent$`
-   `postbackEvent$`

### Operators

-   `ask`
-   `hears`
-   `say`
-   `sendButtonTemplate`
-   `sendGenericTemplate`
-   `sendQuickReplies`
-   `showSenderAction`

## TODO

-   [ ] xstate Integration
-   [ ] Support multiple channels?
