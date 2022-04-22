import serverBoot from "./server.boot.js";
import routesBoot from "./routes.boot.js";
import generalMiddlewares from "./general-middlewares.js";

export default () => {
  const app = serverBoot();

  generalMiddlewares(app);
  routesBoot(app);

  app.listen(app.get("PORT"), () => {
    console.info(`Listening on port ${app.get("PORT")}`);
  });
}
