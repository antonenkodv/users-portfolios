'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('images',
        [{
          id: "fb81e764-2c06-4e16-a469-f631c054a12d",
          filename: "d0cdc687-1ce2-4e7d-934e-a9ad13adcd6c-unknow.jpeg",
          description: "image description",
          owner_id: "0799135d-37e0-4c7e-8dbd-58217c798b9c",
          portfolio_id: "2bf44a5e-e8b4-4085-bbc5-b858117df0fd",
          comments : ['great picture!'],
          createdAt: new Date(),
          updatedAt: new Date()
        }])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('images', null, {});
  }
};
