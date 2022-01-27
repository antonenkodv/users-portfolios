const {Sequelize, DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Portfolio = sequelize.define('portfolio', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true
        },
        name : {type : DataTypes.STRING},
        owner_id : {type : DataTypes.UUID},
        description : {type : DataTypes.STRING}
    })

    Portfolio.associate = models => {
        Portfolio.hasMany(models.Image, {
            foreignKey : "portfolio_id",
            sourceKey : "id"
        })
    }

    return Portfolio
}