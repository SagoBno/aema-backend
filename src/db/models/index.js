import Sequelize from "sequelize";

import config from "../config/database.js";

const { dialect, username, password, port, database, host } = config;

const sequelize = new Sequelize(
  `${dialect}://${username}:${password}@${host}:${port}/${database}`
);

export default sequelize;
