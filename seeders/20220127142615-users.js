'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users',
            [{
                id: "0799135d-37e0-4c7e-8dbd-58217c798b9c",
                name: "user name",
                email: "useremail@mail.com",
                password: "$2b$12$bpSgkpEz.hEiLFvolOdDuOrLsGdwsyhptVG.HzAD80FyhDegLaVWu",
                status: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};
