'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      models.Book.associate = function(models) {
        models.Book.belongsTo(models.Author, {
          foreignKey: 'authorId',
          onDelete: 'CASCADE'
        });
        models.Book.belongsTo(models.Genre, {
          foreignKey: 'genreId',
          onDelete: 'CASCADE'
        });
      };
    }
  }

  Book.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    cover: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    releaseDate: DataTypes.DATE,
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Author',
        key: 'id'
      }
    },
    genreId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Genre',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Book',
  });

  return Book;
};