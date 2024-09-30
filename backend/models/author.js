'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
    }
  }

  Author.init({
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    Name: DataTypes.STRING,
    DateOfBirth: DataTypes.DATE,
    About: DataTypes.TEXT,
    Picture: DataTypes.STRING,
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
    modelName: 'Author',
  });

  return Author;
};