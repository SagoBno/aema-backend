import { DataTypes } from "sequelize";

import sequelize from "./index.js";
import User from "./User.js";

const UserAnswer = sequelize.define(
  "UserAnswer",
  {
    answerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    freezeTableName: false,
    tableName: "UsersAnswers",
  }
);

export default UserAnswer;
