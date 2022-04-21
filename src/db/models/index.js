import Sequelize from "sequelize";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const config = require("../config/database.json");

const env = process.env.NODE_ENV || "development";

const { username, password, database, host, port, dialect } = config[env];

const sequelize = new Sequelize(
  `${dialect}://${username}:${password}@${host}:${port}/${database}`
);

export default sequelize;
