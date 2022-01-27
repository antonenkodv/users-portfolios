'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                unique: true
            },
            name: {type: DataTypes.STRING},
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            status: {type: DataTypes.STRING, defaultValue: null},
            password: {type: DataTypes.STRING},
            createdAt: {type: DataTypes.DATE},
            updatedAt: {type: DataTypes.DATE}
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users')
    }
};
