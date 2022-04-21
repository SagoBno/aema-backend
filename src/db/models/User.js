import { DataTypes } from "sequelize";

import sequelize from "./index.js";

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.BLOB,
    },
    salt: {
      type: DataTypes.BLOB,
    },
  },
  {
    freezeTableName: false,
    tableName: "Users",
  }
);

export default User;
