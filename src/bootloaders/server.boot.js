import config from "config";
import express from "express";

export default () => {
  const app = express();

  app.set("PORT", config.get("server.port"));

  return app;
};
