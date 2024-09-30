'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      Cover: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.TEXT
      },
      Pages: {
        type: Sequelize.INTEGER
      },
      ReleaseDate: {
        type: Sequelize.DATE
      },
      AuthorId: {
        type: Sequelize.UUID
      },
      GenreId: {
        type: Sequelize.UUID
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};