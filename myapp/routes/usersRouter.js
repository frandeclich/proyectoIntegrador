var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')


/* GET users listing. */
router.get('/login', usersController.login);
router.post('/login',usersController.processLogin)

router.get('/register',usersController.register)
router.post('/register',usersController.processRegister)

router.get('/micarrito',usersController.micarrito)

module.exports = router;
