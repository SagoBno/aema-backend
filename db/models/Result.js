import { Model } from "sequelize";

export default function (sequelize, DataTypes) {
  class Result extends Model {
    static associate(models) {
      Result.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Result.init(
    {
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
