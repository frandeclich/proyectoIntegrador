const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
    home: (req, res) => {
        db.Product.findAll({
            where:{exists:1}
        })
            .then((products) => {
                let featured = products.filter((product) => {
                    return product.featured == true;
                });
                return res.render("home", {
                    title: "Inicio",
                    featured,
                });
            })
            .catch((error) => {
                res.send(error);
            });
    },
    search: (req, res) => {
        let query = req.query.search;

        db.Product.findAll({
            where: {
                [Op.or]:[
                    {title: {
                        [Op.like]:`%${query}%`,
                    }},
                    {description:{
                        [Op.like]:`%${query}%`
                    }}
                ],
                exists:1
            },
            include: [
                {
                    association: "category",
                },
                {
                    association: "admin",
                },
            ],
        })
            .then((products) => {
                
                return res.render("search", {
                    title: 'Resultado de tu búsqueda "' + query + '"',
                    products,
                    query,
                });
            })
            .catch((error) => {
                res.send(error);
            });
    },
    detail: (req, res) => {
        db.Product.findOne({
            where: {
                id:req.params.id,
                exists:1
            },
            include: [
                {
                    association: "category",
                },
                {
                    association: "admin",
                },
            ],
        })
            .then((product) => {
                return res.render("detail", {
                    title: 'Detalle del producto "' + product.title + '"',
                    product,
                });
            })
            .catch((error) => {
                res.send(error);
            });
    },
};
