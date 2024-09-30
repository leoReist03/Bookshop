'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Genres', [
      {
        id: '7624e2f9-7b63-4e0a-910f-a510dce5a229',
        name: 'Science Fiction',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '886fac8c-46d3-43ef-8b16-db9de1a69dca',
        name: 'Fantasy',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
