var express = require('express');
const { login, register } = require('../controllers/usersController');
var router = express.Router();
const usersController = require('../controllers/usersController')


/* GET users listing. */
router.get('/login', usersController.login);
router.get('/register',usersController.register)
router.get('/micarrito',usersController.micarrito)

module.exports = router;
