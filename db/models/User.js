import { Model } from "sequelize";

export default function (sequelize, DataTypes) {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserAnswer, { foreignKey:'userId' });
    }
  }
  User.init(
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
      sequelize,
      modelName: "User",
      freezeTableName: false,
      tableName: "Users",
    }
  );
  return User;
}
