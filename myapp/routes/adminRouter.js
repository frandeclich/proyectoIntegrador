const express = require('express');
const router = express.Router();

const upload = require('../middlewares/subidaImagenes');
/* const registerAdminValidator = require('../validations/registerAdminValidator'); */


const {productsList,productsCreate,productsDelete,productsEdit,productsStore,productsUpdate} = require('../controllers/adminController');



//entidad administradores



/* router.get('/register',register);
router.post('/register',registerAdminValidator, processRegister);

router.get('/login',login);
router.post('/login',processLogin);


 */




//entidad autos
router.get('/products',productsList);

router.get('/products/create', productsCreate);
router.post('/products/store',upload.any(),productsStore);

router.get('/products/edit/:id',productsEdit);
router.put('/products/update/:id/',upload.any(),productsUpdate);

router.delete('/products/delete/:id',productsDelete);


module.exports = router;