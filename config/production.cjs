module.exports = {
  session: {
    secret: "keyboard cat production",
    cookie: {
      secure: true,
    },
  },
  db: {
    username: "postgres",
    password: "1LjFvFyCu8BuYSHLQt1O",
    database: "railway",
    host: "containers-us-west-40.railway.app",
    port: 7914,
    dialect: "postgres",
  },
  isProduction: true,
};
