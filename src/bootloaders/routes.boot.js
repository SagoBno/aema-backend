import fs from 'fs';
import path from 'path';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export default async (app) => {
  const { pathname } = new URL('../routes', import.meta.url);

  const routesFiles = fs.readdirSync(pathname);

  await Promise.all(
    routesFiles.map(async (fileName) => {
      const { default: routeHandler } = await import(
        path.join(pathname, fileName)
      );

      const routesBase = fileName.slice(0, -3);
      app.server.use(`/${routesBase}`, routeHandler);
    }),
  );

  // eslint-disable-next-line no-unused-vars
  app.server.use((error, req, res, next) => {
    console.error(error);
    if (error.code === 'EBADCSRFTOKEN') {
      return res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  });

  return app;
};
