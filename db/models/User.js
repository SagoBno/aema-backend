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
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      termsAcepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Otro',
      },
      birthday: {
        type: DataTypes.DATE,
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
      modelName: 'User',
      freezeTableName: false,
      tableName: 'Users',
    },
  );
  return User;
};
