var express = require('express');
const { login, register } = require('../controllers/usersController');
var router = express.Router();
const usersController = require('../controllers/usersController')
let {}=usersController

/* GET users listing. */
router.get('/login', login);
router.get('/register',register)

module.exports = router;
