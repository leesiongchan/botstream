import botstream, { messageEvent$, say } from './dist/index';

const bot = botstream({
  facebookAccessToken:
    'EAAHj7wWcgGEBALMPmzFMZANaZBvPiUZB9CfharI0Hjv7LUhAd5Mc8gtMwIZCATS4qTJ3ZAydcRUoFBECvggMs1W2bEItp254poKO0461gV1ZCgQasJIhkBVVuxS7P4MyeuPvCUKpHIfkCsAbQH54lGpuwflCtsQxq8u3QeTdv3wtlZBMLxwzZBAuiWFOqC41sagZD',
  facebookVerifyToken: 'amuser-bullfight-gotten',
  port: 1234,
});

export const echoConvo$ = messageEvent$.pipe(say(ev => `Echo: ${ev.message.text}`));

bot.loadSkills([echoConvo$]);
