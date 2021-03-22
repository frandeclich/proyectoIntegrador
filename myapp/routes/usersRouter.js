var express = require('express');
const { logout, processRegister, register, login, processLogin, micarrito, profile } = require('../controllers/usersController');
var router = express.Router();
const usersController = require('../controllers/usersController')

const onlyGuestsMiddleware = require('../middlewares/onlyGuestsMiddleware');
const onlyUsersMiddleware = require('../middlewares/onlyUsersMiddleware');

const registerValidator = require('../validations/registerValidator')
const loginValidator = require('../validations/loginValidator')




/* GET users listing. */
router.get('/login',onlyGuestsMiddleware, login);
router.post('/login',loginValidator,processLogin)

router.get('/register',onlyGuestsMiddleware,register)
router.post('/register',registerValidator,processRegister)

router.get('/logout',logout)

router.get('/micarrito',onlyUsersMiddleware,micarrito)
router.get('/profile',onlyUsersMiddleware,profile)

module.exports = router;  
