

module.exports = (sequelize, dataTypes) => {
    const alias = 'Admin'

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(70),
            allowNull: false
        },
        type:{
            type: dataTypes.TINYINT
        }
    }
    const config = {
        tableName: 'admins',
        timestamps: false,
        underscored: true
    }

    const Admin = sequelize.define(alias, cols, config)

    Admin.associate = function (models) {
        Admin.hasMany(models.Product, {
            as: "products",
            foreignKey: 'admin_id'
        })
    }

    return Admin
}