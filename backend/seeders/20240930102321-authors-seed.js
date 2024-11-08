'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Authors', [
      {
        id: 'bd2ba5a7-7300-4521-b1f9-225ba8c4c2d3',
        name: 'Pierce Brown',
        dateOfBirth: new Date('1988-01-28'),
        about: 'Pierce Elliot Brown (* 28. Januar 1988 in Denver) ist ein US-amerikanischer Science-Fiction-Autor. Brown wurde durch den Romanzyklus Red Rising bekannt, von dem inzwischen sechs Romane erschienen sind.',
        picture: 'https://res.cloudinary.com/dtsrisryl/image/upload/f_auto,q_auto/v1/authors/pierceBrown',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'c9d0ae61-a25c-40de-8e0a-dbe939607d03',
        name: 'Brandon Sanderson',
        dateOfBirth: new Date('1975-12-19'),
        about: 'Brandon Sanderson (* 19. Dezember 1975 in Lincoln, Nebraska) ist ein US-amerikanischer Autor von Fantasy- und Science-Fiction-Literatur. Der überwiegende Teil seines Werkes lässt sich dem Subgenre der High Fantasy zuordnen. Bekannt wurde Sanderson vor allem durch seine Mistborn-Reihe (dt. Nebelgeboren). Er beendete den sehr populären und einflussreichen Zyklus Das Rad der Zeit, nachdem dessen Schöpfer Robert Jordan verstorben war.',
        picture: 'https://res.cloudinary.com/dtsrisryl/image/upload/f_auto,q_auto/v1/authors/chrispopherRuocchio',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
