import { DataTypes } from "sequelize";

import sequelize from "./index.js";
import UserAnswer from "./UserAnswer.js";

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

User.hasMany(UserAnswer, { foreignKey: { name: 'userId', allowNull: false } });

export default User;
