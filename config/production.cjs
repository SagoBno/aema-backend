module.exports = {
  session: {
    secret: "keyboard cat production",
    cookie: {
      secure: true,
    },
  },
  db: {
    username: "postgres",
    password: "2uEK7Y5VOs5tzDqZhppV",
    database: "railway",
    host: "containers-us-west-45.railway.app",
    port: 6227,
    dialect: "postgres",
  },
  isProduction: true,
};
