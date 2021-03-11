const db = require("../database/models");
const { Op } = require("sequelize");


module.exports = {
    vinilos: (req, res) => {
        db.Product.findAll({
            where: {
                category_id: 1,
                exists:1
            }
        })
            .then((products) => {
                let featured = products.filter((product) => {
                    return product.featured == true;
                });
                return res.render('categorySub', {
                    title: 'Vinilos',
                    products,
                    featured
                })
            })
            .catch((error) => {
                res.send(error);
            });
    },
    cds: (req, res) => {
        db.Product.findAll({
            where: {
                category_id: 2,
                exists:1
            }
        })
            .then((products) => {
                let featured = products.filter((product) => {
                    return product.featured == true;
                });
                return res.render('categorySub', {
                    title: "CD'S",
                    products,
                    featured
                })
            })
            .catch((error) => {
                res.send(error);
            });
    },
    cassettes: (req, res) => {
        db.Product.findAll({
            where: {
                category_id: 3,
                exists:1
            }
        })
            .then((products) => {
                let featured = products.filter((product) => {
                    return product.featured == true;
                });
                return res.render('categorySub', {
                    title: 'Cassettes',
                    products,
                    featured
                })
            })
            .catch((error) => {
                res.send(error);
            });
    },
    speakers: (req, res) => {
        db.Product.findAll({
            where: {
                category_id: 4,
                exists:1
            }
        })
            .then((products) => {
                let featured = products.filter((product) => {
                    return product.featured == true;
                });
                return res.render('categorySub', {
                    title: 'Periféricos y otros',
                    products,
                    featured
                })
            })
            .catch((error) => {
                res.send(error);
            });
    }

}