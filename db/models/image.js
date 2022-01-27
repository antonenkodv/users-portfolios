const {Sequelize, DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define('images', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true
        },
        filename: {type: DataTypes.STRING, unique: true},
        description: {type: DataTypes.STRING},
        owner_id: {type: DataTypes.UUID},
        portfolio_id: {type: DataTypes.UUID},
        comments : {type : DataTypes.ARRAY(DataTypes.TEXT) , defaultValue : null}
    })

    Image.associate = models => {
        Image.belongsTo(models.Portfolio, {
            foreignKey : "portfolio_id",
            sourceKey : "id",
        })
    }
    return Image
}