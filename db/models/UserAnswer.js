import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UserAnswer extends Model {
    static associate(models) {
      UserAnswer.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  UserAnswer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      answerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      value: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'UserAnswer',
      freezeTableName: false,
      tableName: 'UsersAnswers',
    },
  );
  return UserAnswer;
};
