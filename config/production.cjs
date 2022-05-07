const FRONTEND_URL = 'https://aema-frontend-production.up.railway.app';

module.exports = {
  server: {
    whitelist: [
      FRONTEND_URL,
    ],
    port: process.env.PORT || 3001,
  },
  session: {
    secret: 'keyboard cat production',
    cookie: {
      secure: true,
      domain: FRONTEND_URL.slice(8),
    },
  },
  csrf: {
    cookie: {
      secure: true,
      domain: FRONTEND_URL.slice(8),
    },
  },
  db: {
    username: 'postgres',
    password: '2uEK7Y5VOs5tzDqZhppV',
    database: 'railway',
    host: 'containers-us-west-45.railway.app',
    port: 6227,
    dialect: 'postgres',
  },
  redis: {
    host: 'redis-11933.c80.us-east-1-2.ec2.cloud.redislabs.com',
    port: '11933',
    password: 'SgCz7bBus1VTrXAcBjDzEy9K5O44eXwl',
    database: 'aema',
  },
  isProduction: true,
};
