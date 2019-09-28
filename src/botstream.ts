import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { combineLatest, ObservableInput } from 'rxjs';

interface BotstreamConfig {
  facebookAccessToken: string;
  facebookApiVersion?: string;
  facebookVerifyToken: string;
  port?: number;
}

// Global config file
export let globalConfig: BotstreamConfig;

function loadSkills<O extends ObservableInput<any>>(...skills: O[]) {
  combineLatest(...skills).subscribe();
}

function botstream(config: BotstreamConfig) {
  globalConfig = config;

  const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = require('./server').default;
  app.listen(config.port || 3000);

  return {
    loadSkills,
  };
}

export default botstream;
