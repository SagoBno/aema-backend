import { DataTypes } from "sequelize";

import sequelize from "./index.js";

const Result = sequelize.define(
  "Result",
  {
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: false,
    tableName: "Results",
  }
);

export default Result;
