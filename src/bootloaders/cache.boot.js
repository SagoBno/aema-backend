import Redis from 'ioredis';

import config from 'config';

export default (appParam) => {
  const app = appParam;

  let options = {
    enableOfflineQueue: false,
  };
  if (config.get('isProduction')) {
    options = {
      ...options,
      port: config.get('redis.port'),
      host: config.get('redis.host'),
      password: config.get('redis.password'),
      database: config.get('redis.database'),
    };
  }
  const redisClient = new Redis(options);

  // TODO: process Redis errors and setup some reconnection strategy
  redisClient.on('error', (error) => {
    console.error(error);
  });

  app.redis = redisClient;

  return Promise.resolve(appParam);
};
