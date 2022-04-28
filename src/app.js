import boot from "./bootloaders/index.js";

const app = {
  models: {},
};

boot(app).then((app) =>
  app.server.listen(app.server.get("PORT"), () => {
    console.info(`Listening on port ${app.server.get("PORT")}`);
  })
);

export default app;
