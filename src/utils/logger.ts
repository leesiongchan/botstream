import pinoInstance from 'pino';

const isProd = process.env.NODE_ENV === 'production';

const pino = pinoInstance({
  level: isProd ? 'info' : 'trace',
  prettyPrint: !isProd,
});

export default pino;
