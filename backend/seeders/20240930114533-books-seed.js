'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [
      {
        id: uuidv4(),
        cover: 'redRising.jpg',
        name: 'Red Rising',
        description: 'Darrow is a Helldiver. A pioneer of Mars. Born to slave beneath the earth so that one day, future generations might live above it.He is a Red - humankinds lowest caste. But he has something the Golds - the ruthless ruling class - will never understand. He has a wife he worships, a family who give him strength. He has love. And when they take that from him, all that remains is revenge . . .',
        pages: 416,
        releaseDate: new Date('2014-06-15'),
        authorId: 'bd2ba5a7-7300-4521-b1f9-225ba8c4c2d3',
        genreId: '7624e2f9-7b63-4e0a-910f-a510dce5a229',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        cover: 'wayOfKings.jpg',
        name: 'The Way of Kings',
        description: 'Brandon Sanderson, widely acclaimed for his work completing Robert Jordans "Wheel of Time saga", begins a grand cycle of his own, with The Way of Kings, Book One of the Stormlight Archive. Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter. It has been centuries since the fall of the ten consecrated orders known as the Knights Radiant, but their Shardblades and Shardplate remain: mystical swords and suits of armor that transform ordinary men into near-invincible warriors. Men trade kingdoms for Shardblades. Wars were fought for them, and won by them. One such war rages on a ruined landscape called the Shattered Plains. There, Kaladin, who traded his medical apprenticeship for a spear to protect his little brother, has been reduced to slavery. In a war that makes no sense, where ten armies fight separately against a single foe, he struggles to save his men and to fathom the leaders who consider them expendable. Brightlord Dalinar Kholin commands one of those other armies. Like his brother, the late king, he is fascinated by an ancient text called The Way of Kings. Troubled by over-powering visions of ancient times and the Knights Radiant, he has begun to doubt his own sanity.Across the ocean, an untried young woman named Shallan seeks to train under an eminent scholar and notorious heretic, Dalinars niece, Jasnah. Though she genuinely loves learning, Shallans motives are less than pure. As she plans a daring theft, her research for Jasnah hints at secrets of the Knights Radiant and the true cause of the war. The result of over ten years of planning, writing, and world-building, "The Way of Kings" is but the opening movement of the "Stormlight Archive", a bold masterpiece in the making.',
        pages: 1258,
        releaseDate: new Date('2011-04-24'),
        authorId: 'c9d0ae61-a25c-40de-8e0a-dbe939607d03',
        genreId: '886fac8c-46d3-43ef-8b16-db9de1a69dca',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
