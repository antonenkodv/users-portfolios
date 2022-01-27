'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("portfolios", {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                unique: true
            },
            name: {type: DataTypes.STRING},
            owner_id: {
                type: DataTypes.UUID,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            description: {type: DataTypes.STRING},
            createdAt: {type: DataTypes.DATE},
            updatedAt: {type: DataTypes.DATE}
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('portfolios')
    }
};
