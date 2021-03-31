const express = require('express');
const router = express.Router();

const upload = require('../middlewares/subidaImagenes');
const createProductValidator = require('../validations/createProductValidator')
const editProductValidator = require('../validations/editProductValidator')

const {productsList,login,productsSearch,productsCreate,productsDelete,productsEdit,productsStore,productsUpdate, register, processLogin, processRegister} = require('../controllers/adminController');



//entidad autos
router.get('/products',productsList);

router.get('/register',register)
router.post('/register',processRegister)

router.get('/login',login)
router.post('/login',processLogin)

router.get('/search',productsSearch)

router.get('/products/create', productsCreate);
router.post('/products/store',upload.any(),createProductValidator,productsStore);

router.get('/products/edit/:id',productsEdit);
router.put('/products/update/:id/',upload.any(),editProductValidator,productsUpdate);

router.delete('/products/delete/:id',productsDelete);


module.exports = router;