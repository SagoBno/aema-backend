import { Model } from "sequelize";

export default function (sequelize, DataTypes) {
  class Result extends Model {
    static associate(models) {}
  }
  Result.init(
    {
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Result",
      freezeTableName: false,
      tableName: "Result",
    }
  );
  return Result;
}
