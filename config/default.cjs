module.exports = {
  server: {
    whitelist: [
      'http://localhost:3000',
    ],
    port: process.env.PORT || 3001,
  },
  db: {
    username: 'aema',
    password: 'aema',
    database: 'aema-development',
    host: 'localhost',
    port: 5431,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    seederStorageTableName: '_SeedersLog',
    migrationStorageTableName: '_MigrationsLog',
  },
  session: {
    secret: 'keyboard cat',
    cookie: {
      secure: false,
      domain: '',
    },
  },
  csrf: {
    cookie: {
      secure: false,
      domain: '',
    },
  },
  rateLimiter: {
    slowBruteByIP: {
      keyPrefix: 'login_fail_ip_per_day',
      points: 100, // Max wrong attempts by IP per day
      duration: 60 * 60 * 24,
      blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 wrong attempts per day
    },
    consecutiveFailsByUsernameAndIP: {
      keyPrefix: 'login_fail_consecutive_username_and_ip',
      points: 10, // Max consecutive fails by username and IP
      duration: 60 * 60 * 24 * 90, // Store number for 90 days since first fail
      blockDuration: 60 * 60, // Block for 1 hour
    },
  },
  isProduction: false,
};
