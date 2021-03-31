const path = require('path');

const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('email')
        .notEmpty()
        .withMessage('El email es requerido'),

    check('email')
        .isEmail()
        .withMessage('Debe ingresar un email válido'),

    check('pass')
        .notEmpty()
        .withMessage('La constraseña es requerida'),

    check('pass')
        .isLength({
            min: 6,
            max: 14
        })
        .withMessage('La contraseña debe tener entre 6 y 14 caracteres'),

    body('email').custom(value => {
        return db.User.findOne({
            where: {
                email: value
            }
        })
            .then((user) => {
                if (user) {
                    return Promise.reject('Este email ya está registrado')
                }
            })
    }),

    body('emailconfirm').custom((value, { req }) => {
        if (value !== req.body.email) {

            return false
        } else {
            return true
        }
    }).withMessage('¡Los emails no son los mismos!'),



    body('passconfirm').custom((value, { req }) => {
        if (value !== req.body.passconfirm) {
            return false
        } else {
            return true
        }
    })

]