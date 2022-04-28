import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "../../db/config/database.js";

export default (app) =>
  new Promise(async (resolve) => {
    const { pathname } = new URL("../../db/models", import.meta.url);

    const db = {};

    const { dialect, username, password, port, database, host } = config;

    const sequelize = new Sequelize(
      `${dialect}://${username}:${password}@${host}:${port}/${database}`
    );

    const modelsFiles = fs.readdirSync(pathname);

    await Promise.all(
      modelsFiles.map(async (file) => {
        const { default: model } = await import(path.join(pathname, file));

        const loadedModel = model(sequelize, Sequelize.DataTypes);
        db[loadedModel.name] = loadedModel;
      })
    );

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    app.db = db;

    resolve(app);
  });
