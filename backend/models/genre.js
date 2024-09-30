'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
    }
  }

  Genre.init({
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    Name: DataTypes.STRING,
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.DATE,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Genre',
  });

  return Genre;
};