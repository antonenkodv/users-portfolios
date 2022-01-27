'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('portfolios',
        [{
          id: "2bf44a5e-e8b4-4085-bbc5-b858117df0fd",
          name: "user portfolio",
          owner_id: "0799135d-37e0-4c7e-8dbd-58217c798b9c",
          description: "portfolio description",
          createdAt: new Date(),
          updatedAt: new Date()
        }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('portfolios', null, {});
  }
};
