module.exports = (sequelize, dataTypes) => {
    const alias = "User";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(70),
            allowNull: false,
        },
        address: {
            type: dataTypes.STRING(70),
        },
    };
    const config = {
        tableName: "users",
        timestamps: false,
        underscored: true,
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsToMany(models.Product, {
            as: "products_liked",
            through: "user_product_liked",
            foreignKey: "user_id",
            otherKey: "product_id",
        });

        User.belongsToMany(models.Product, {
            as: "products_shopping",
            through: "user_product_shopping",
            foreignKey: "user_id_shopping",
            otherKey: "product_id_shopping",
        });
    };
    return User;
};
