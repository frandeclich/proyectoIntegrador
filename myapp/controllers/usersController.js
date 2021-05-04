const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

const { getUsers, setUser } = require(path.join('..', 'data', 'usersData'))
let users = getUsers()


module.exports = {
    login: (req, res) => {
        res.render('login', {
            title: 'Iniciar Sesión'
        })
    },
    register: (req, res) => {
        res.render('register', {
            title: 'Registrate'
        })
    },
    processLogin: (req, res) => {

        const { email, pass, rememberme } = req.body
        db.User.findOne({
            where : {
                email: email
            }
        })
        .then((user) => {
            if (user && bcrypt.compareSync(pass.trim(), user.password)) {
                req.session.user = {
                    id : user.id,
                    name : user.name,
                    role : user.role
                }
                if (rememberme != undefined) {
                    res.cookie('rememberme', user.email, { maxAge: 60000 })
                }
                return res.redirect('/')
            }
            else {
                return res.render('login', {
                    title: 'Error en el login.',
                    error: 'Los datos enviados no coinciden con los datos de ningún usuario.'
                })
            }
        })
        .catch((error) =>  res.send(error + '1') )
    },
    processRegister: (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            return res.render('register', {
                title: 'Formulario inválido',
                errors: errors.mapped(),
                old: req.body
            })
        }
        else {
            const { email, pass } = req.body

            let passHash = bcrypt.hashSync(pass.trim(), 12)
            let role = 0

            db.User.create({
                email: email.trim(),
                password: passHash,
                role: role
            })
                .then(() => {
                    res.redirect('/user/login')
                })
                .catch((error) => { res.send(error) })
        }
    },
    logout: (req, res) => {
        delete req.session.user
        res.cookie('rememberme', '', { maxAge: -1 })
        res.redirect('/user/login')
    },
    micarrito: (req, res) => {
        res.render('micarrito', {
            title: 'Tu carrito'
        })
    },
    profile: (req, res) => {
        let user = req.session.user
        res.render('profile', {
            title: 'Tu perfil',
            /* user */
        })
    }
}