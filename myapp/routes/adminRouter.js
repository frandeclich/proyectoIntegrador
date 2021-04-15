const express = require('express');
const router = express.Router();

const upload = require('../middlewares/subidaImagenes');
const createProductValidator = require('../validations/createProductValidator')
const editProductValidator = require('../validations/editProductValidator')

const onlyAdminsMiddleware = require('../middlewares/onlyAdminsMiddleware');
const onlyYourProductsMiddleware = require('../middlewares/onlyYourProductsMiddleware')
const onlySuperadminMiddleware = require('../middlewares/onlySuperadminMiddleware')

const {productsList,login,productsSearch,productsCreate,productsDelete,productsEdit,productsStore,productsUpdate, register, processLogin, processRegister, users, doadmin, undoadmin} = require('../controllers/adminController');



//entidad autos
router.get('/products', onlyAdminsMiddleware,productsList);

router.get('/users',onlySuperadminMiddleware,users)

router.delete('/users/doadmin/:id',onlySuperadminMiddleware, doadmin)
router.delete('/users/undoadmin/:id',onlySuperadminMiddleware,undoadmin)

router.get('/register',register)
router.post('/register',processRegister)

router.get('/login',login)
router.post('/login',processLogin)

router.get('/search', onlyAdminsMiddleware,productsSearch)

router.get('/products/create', onlyAdminsMiddleware, productsCreate);
router.post('/products/store',upload.any(),createProductValidator, onlyAdminsMiddleware,productsStore);

router.get('/products/edit/:id', onlyAdminsMiddleware,onlyYourProductsMiddleware,productsEdit);
router.put('/products/update/:id/',upload.any(),editProductValidator, onlyAdminsMiddleware,onlyYourProductsMiddleware,productsUpdate);

router.delete('/products/delete/:id', onlyAdminsMiddleware,onlyYourProductsMiddleware,productsDelete);


module.exports = router;