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
    Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    Cover: DataTypes.STRING,
    Name: DataTypes.STRING,
    Description: DataTypes.TEXT,
    Pages: DataTypes.INTEGER,
    ReleaseDate: DataTypes.DATE,
    AuthorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Author',
        key: 'id'
      }
    },
    GenreId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Genre',
        key: 'id'
      }
    },
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
    modelName: 'Book',
  });

  return Book;
};