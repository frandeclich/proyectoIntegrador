const path = require('path');

const {check, validationResult, body} = require('express-validator');
const {getUsers, setUser}=require(path.join('..','data','usersData'))
let users=getUsers()

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
        min:3,
        max:8
        })
    .withMessage('La contraseña debe tener entre 3 y 8 caracteres'),

    body('email').custom(value => {
        let result = users.find(user => user.email.toLowerCase() === value.toLowerCase().trim());

        if(result){
            return false
        }else {
            return true
        }
    }).withMessage('¡El usuario ya está registrado!'),

    body('emailconfirm').custom((value, {req}) =>{
        if (value !== req.body.email) {
            
            return false
        } else {
            return true
        }
    }).withMessage('¡Los emails no son los mismos!'),

    

    body('passconfirm').custom(( value, {req}) => {
        if(value !== req.body.passconfirm) {
         return false 
       } else {
        return true
       }
    })
    
    ]