import config from "config";
import express from "express";

export default (app) =>
  new Promise((resolve) => {
    const server = express();

    server.set("PORT", config.get("server.port"));

    app.server = server;

    resolve(app);
  });
