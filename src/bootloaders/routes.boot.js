import fs from "fs";
import path from "path";

export default async (app) => {
  const { pathname } = new URL("../routes", import.meta.url);

  const routesFiles = fs.readdirSync(pathname);

  await Promise.all(
    routesFiles.map(async (fileName) => {
      const { default: routeHandler } = await import(
        path.join(pathname, fileName)
      );

      const routesBase = fileName.slice(0, -3);
      app.server.use(`/${routesBase}`, routeHandler);
    })
  );

  return app;
};
