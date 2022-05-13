import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserAnswer, { foreignKey: 'userId' });
      User.hasMany(models.Result, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      parentFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentLastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentBirthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      termsAcepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      childFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      childLastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Otro',
      },
      childBirthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      freezeTableName: false,
      tableName: 'Users',
    },
  );
  return User;
};
