const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { check, validationResult, body } = require('express-validator');

const db = require("../database/models");
const { Op } = require("sequelize");


module.exports = {



    productsList: (req, res) => {
        let admin_id = req.session.user.id
        db.Product.findAll({
            where: { 
                exists: 1,
                admin_id
            }
        })
            .then((products) => {
                return res.render('admin/products', {
                    title: 'Listado de productos',
                    products
                })
            })
            .catch((error) => { res.send(error) })
    },
    users:(req,res)=>{
        db.User.findAll({
            where:{id:{[Op.ne]:1}}
        })
            .then((users)=>{
                res.render('admin/usersAndAdmins',{
                    title:'Usuarios',
                    users
                })
            })
            .catch((error) => { res.send('Hola'+error) })
    },
    doadmin:(req,res)=>{
        let id=req.params.id
        db.User.update({
            role:1
        },{
            where:{id}
        })
            .then(() => {
                res.redirect('/admin/users');
            })
            .catch((error) => { res.send(error) })
    },
    undoadmin:(req,res)=>{
        let id=req.params.id
        db.User.update({
            role:0
        },{
            where:{id}
        })
            .then(() => {
                res.redirect('/admin/users');
            })
            .catch((error) => { res.send(error) })
    },
    login:(req,res)=>{
        res.render('admin/login',{
            title:'Login'
        })
    },
    processLogin:(req,res)=>{
        const { email, pass, rememberme } = req.body
        db.Admin.findOne({
            where : {
                email
            }
        })
        .then((admin) => {
            if (admin && bcrypt.compareSync(pass.trim(),admin.password)) {
                req.session.admin = {
                    id : admin.id,
                    name : admin.name,
                }
                if (rememberme != undefined) {
                    res.cookie('rememberme-admin', admin.email, { maxAge: 120000 })
                }
                return res.redirect('/admin/products')
            }
            else {
                return res.render('admin/login', {
                    title: 'Error en el login.',
                    error: 'Los datos enviados no coinciden con los datos de ningún usuario.'
                })
            }
        })
        .catch((error) => { res.send('Hola'+error) })
    },
    register:(req,res)=>{
        res.render('register', {
            title: 'Registrate'
        })
    },
    processRegister: (req,res)=>{
        
        const { email, pass } = req.body

        let passHash = bcrypt.hashSync(pass.trim(), 12)
        let role = 1

        db.User.create({
            email: email.trim(),
            password: passHash,
            role: role
        })
            .then(() => {
                res.redirect('/user/login')
            })
            .catch((error) => { res.send(error) })
        },
    productsSearch: (req, res) => {
        let query = req.query.search
        let admin_id = req.session.user.id
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
                ],
                exists: 1,
                admin_id
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
        return res.render('admin/productsCreate', {
            title: 'Crear un nuevo producto',

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
            const { title, description, condition, price, featured, category } = req.body;
            if (req.files[0]) {
                var image = req.files[0].filename
            }
            var admin_id = req.session.user.id
            var exists = 1
            db.Product.create({
                title: title,
                description: description,
                condition: Boolean(condition),
                featured: Boolean(featured),
                price: price,
                image: image,
                category_id: category,
                admin_id: admin_id,
                exists: exists
            })
                .then((product) => {
                    res.redirect('/admin/products');
                })
                .catch((error) => { res.send(error) })
        }
    },
    productsEdit: (req, res) => {

        db.Product.findOne({
            where: {
                id: req.params.id,
                exists: 1
            },
            include: [
                { association: "category", }
            ],
        })
            .then((product) => {
                return res.render('admin/productsEdit', {
                    product,
                    title: 'Edita tu producto'
                })
            })
            .catch((error) => { res.send(error) })

    },
    productsUpdate: (req, res, next) => {
        const { title, description, condition, price, featured, category } = req.body;

        const errors = validationResult(req)

        db.Product.findOne({
            where: { id: req.params.id },
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
                if (!errors.isEmpty()) {
                    if (req.files[0]) {

                        if (fs.existsSync(path.join('public', 'images', req.files[0].filename))) {
                            fs.unlinkSync(path.join('public', 'images', req.files[0].filename))
                        }
                    }
                    return res.render('admin/productsEdit', {
                        title: 'Realice el formulario otra vez.',
                        errors: errors.mapped(),
                        product
                    })
                } else {
                    if (req.files[0]) {
                        if (product.image) {
                            if (fs.existsSync(path.join('public', 'images', product.image))) {
                                fs.unlinkSync(path.join('public', 'images', product.image))
                                var image = req.files[0].filename
                            }
                        }
                    }
                    db.Product.update({
                        title: title,
                        description: description,
                        condition: Boolean(condition),
                        featured: Boolean(featured),
                        price: price,
                        image: image,
                        category_id: category,
                    },
                        {
                            where: {
                                id: req.params.id
                            }
                        })
                        .then(() => {
                            res.redirect('/admin/products');
                        })
                        .catch((error) => { res.send(error) })
                }
            })
            .catch((error) => { res.send(error) })

    },
    productsDelete: (req, res) => {
        db.Product.update({
            exists: 0
        },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect('/admin/products');
            })
            .catch((error) => { res.send(error) })
    }
}




