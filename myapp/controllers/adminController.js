const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { check, validationResult, body } = require('express-validator');

const db = require("../database/models");
const { Op } = require("sequelize");

/* const {getMock,setMock} = require(path.join('..','data','productsData'))
const products = getMock() */




module.exports = {



    productsList: (req, res) => {
        db.Product.findAll()
            .then((products) => {
                return res.render('admin/products', {
                    title: 'Listado de productos',
                    products
                })
            })
            .catch((error) => { res.send(error) })
    },
    productsSearch: (req, res) => {
        let query = req.query.search
        db.Product.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${query}%`,
                        }
                    },
                    {
                        description: {
                            [Op.like]: `%${query}%`
                        }
                    }
                ]
            }
        })
            .then((products) => {
                return res.render('admin/products', {
                    title: 'Resultado de la búsqueda',
                    products,
                    busqueda: req.query.search
                })
            })
            .catch((error) => { res.send(error) })
    },
    productsCreate: (req, res) => {

        res.render('admin/productsCreate', {
            title: 'Crear un nuevo producto'
        })
    },
    productsStore: (req, res, next) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            if (req.files[0]) {

                if (fs.existsSync(path.join('public', 'images', req.files[0].filename))) {
                    fs.unlinkSync(path.join('public', 'images', req.files[0].filename))

                }

            }

            return res.render('admin/productsCreate', {
                title: 'Realice el formulario otra vez.',
                errors: errors.mapped(),
                old: req.body
            })
        } else {
            let lastID = 1;
            db.Product.findAll()
                .then((products) => {
                    products.forEach(product => {
                        if (product.id > lastID) {
                            lastID = product.id
                        }
                    });
                    const { title, description, condition, price, featured, category } = req.body;
                    var image = "acdc-1.jpg"
                    if (req.files[0]) {
                        var image = req.files[0].filename
                    }
                    var admin_id = 1
                    var exists = 1
                    var categoryr = 2
                    db.Product.create({
                        title: title,
                        description: description,
                        condition: Boolean(condition),
                        featured: Boolean(featured),
                        price: price,
                        image: image,
                        category_id: categoryr,
                        admin_id: admin_id,
                        exists: exists
                    })
                        .then((product) => {
                            res.redirect('/admin/products');
                        })
                        .catch((error) => { res.send(error) })

                })
                .catch((error) => { res.send(error) })
        }
    },
    productsEdit: (req, res) => {

        const product = products.find(product => product.id === +req.params.id);

        res.render('admin/productsEdit', {
            product,
            title: 'Edita tu producto'
        })
    },
    productsUpdate: (req, res, next) => {
        const { title, description, condition, price, featured, category } = req.body;

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            if (req.files[0]) {

                if (fs.existsSync(path.join('public', 'images', req.files[0].filename))) {
                    fs.unlinkSync(path.join('public', 'images', req.files[0].filename))
                }
            }
            const product = products.find(product => product.id === +req.params.id);
            return res.render('admin/productsEdit', {
                title: 'Realice el formulario otra vez.',
                errors: errors.mapped(),
                product
            })
        } else {

            products.forEach(product => {
                if (product.id === +req.params.id) {

                    product.id = Number(req.params.id);
                    product.title = title;
                    product.description = description;
                    product.condition = Boolean(condition);
                    product.featured = Boolean(featured);
                    product.price = price;
                    if (req.files[0]) {
                        if (product.image) {
                            if (fs.existsSync(path.join('public', 'images', product.image))) {
                                fs.unlinkSync(path.join('public', 'images', product.image))
                                product.image = req.files[0].filename
                            }
                        }
                    }
                    product.category = category



                }
            });

            setMock(products);
            res.redirect('/admin/products');
        }
    },
    productsDelete: (req, res) => {
        products.forEach(product => {
            if (product.id === +req.params.id) {

                if (product.image) {
                    if (fs.existsSync(path.join('public', 'images', product.image))) {
                        fs.unlinkSync(path.join('public', 'images', product.image))
                    }
                }
                var aEliminar = products.indexOf(product);
                products.splice(aEliminar, 1)
            }
        });

        setMock(products);
        res.redirect('/admin/products');
    }
}




