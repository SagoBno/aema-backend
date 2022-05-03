import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dbConfig from '../../db/config/database.js';

export default async (appParam) => {
  const app = appParam;
  const { pathname } = new URL('../../db/models', import.meta.url);

  const db = {};

  const {
    dialect, username, password, port, database, host,
  } = dbConfig;

  const sequelize = new Sequelize(database, username, password, {
    dialect,
    host,
    port,
    logging: false,
    query: { raw: true },
  });

  const modelsFiles = fs.readdirSync(pathname);

  await Promise.all(
    modelsFiles.map(async (file) => {
      const { default: model } = await import(path.join(pathname, file));

      const loadedModel = model(sequelize, Sequelize.DataTypes);
      db[loadedModel.name] = loadedModel;
    }),
  );

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  app.db = db;

  return app;
};
