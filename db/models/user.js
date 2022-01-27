const {Sequelize, DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
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
        status: {type: DataTypes.STRING , defaultValue : null},
        password: {type: DataTypes.STRING},
    })

    User.associate = models => {
        User.hasMany(models.Portfolio, {
            foreignKey: "owner_id",
            sourceKey: "id"
        }),
            User.hasMany(models.Image, {
                foreignKey: "owner_id",
                sourceKey: "id"
            })
    }

    return User
}