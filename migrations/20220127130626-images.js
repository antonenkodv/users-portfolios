'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("images", {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                unique: true,
            },
            filename: {type: DataTypes.STRING, unique: true},
            description: {type: DataTypes.STRING},
            owner_id: {
                type: DataTypes.UUID,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            portfolio_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'portfolios',
                    key: 'id'
                }
            },
            comments: {type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: null},
            createdAt: {type: DataTypes.DATE},
            updatedAt: {type: DataTypes.DATE}
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('images')
    }
};
