
module.exports = (sequelize, dataTypes) => {
    const alias = 'Product'

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(65),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        condition: {
            type: dataTypes.TINYINT,
            defaultValue: null
        },
        featured: {
            type: dataTypes.TINYINT,
            defaultValue: null
        },
        price: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            defaultValue: null
        },
        admin_id: {
            type: dataTypes.INTEGER,
            defaultValue: null
        },
        exists: {
            type: dataTypes.TINYINT,
            defaultValue: null
        },

    }
    const config = {
        tableName: 'products',
        timestamps: false,
        underscored: true
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: 'category_id'
        })

        Product.belongsTo(models.User, {
            as: "admin",
            foreignKey: 'admin_id'
        })

        Product.belongsToMany(models.User, {
            as: "users_liked",
            through: 'user_product_liked',
            foreignKey: 'product_id',
            otherKey: 'user_id',
        })

        Product.belongsToMany(models.User,{
            as:"users_shopping",
            through: "user_product_shopping",
            foreignKey: 'product_id_shopping',
            otherKey: 'user_id_shopping'
        })
    }
    return Product
}