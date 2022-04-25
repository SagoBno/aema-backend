module.exports = {
  server: {
    whitelist: ["http://localhost:3000"],
    port: 3001,
  },
  db: {
    username: "aema",
    password: "aema",
    database: "aema-development",
    host: "localhost",
    port: 5431,
    dialect: "postgres",
  },
  session: {
    secret: "keyboard cat",
    cookie: {
      secure: false,
    },
  },
};
