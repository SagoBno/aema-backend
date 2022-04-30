import config from "config";
import express from "express";

export default (app) => {
  const server = express();

  server.set("PORT", config.get("server.port"));

  app.server = server;
  return Promise.resolve(app);
};
