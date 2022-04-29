'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Psychologist extends Model {
    static associate(models) {
      // define association here
    }
  }
  Psychologist.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING
    },
    page: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Psychologist',
    freezeTableName: false,
    tableName: 'Psychologists',
  });
  return Psychologist;
};
