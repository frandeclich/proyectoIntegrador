const path = require('path');

const {check, validationResult, body} = require('express-validator');
const {getMock,setMock} = require('../data/productsData')
var products = getMock()


module.exports= [
    check('title').notEmpty().withMessage('Este campo no puede quedar vacío.'),

    check('title').isLength({
        max:65
    }).withMessage('El título del producto es demasiado largo.'),

    /* body('title').custom(value => {
        let result = products.filter(product => product.title.toLowerCase().trim() == value.toLowerCase().trim());

        if(result){
            return false
        }else {
            return true
        }
    }).withMessage('Ya existe un producto con el mismo nombre.'), */

    check('description').notEmpty().withMessage('Este campo no puede quedar vacío.'),

    check('description').isLength({
        max:1000
    }).withMessage('La descripción del producto es demasiado larga.'),

    check('price').notEmpty().withMessage('Este campo no puede quedar vacío.'),

    body('price').custom(value=>{
        if (value.includes('$')) {
            return true
        } else {
            return false
        }
    }).withMessage('El campo del precio debe incluir el signo "$" al principio.'),

    check('category')
    .notEmpty()
    .withMessage('El campo de la categoría no puede quedar vacío')
]
