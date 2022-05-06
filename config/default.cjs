module.exports = {
  server: {
    whitelist: [
      'http://localhost:3000',
      'https://aema-frontend-production.up.railway.app',
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
    },
  },
};
