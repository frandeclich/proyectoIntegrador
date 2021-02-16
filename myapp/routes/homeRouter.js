var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController')
const {home,search,detail}=homeController

/* GET home page. */
router.get('/', home);
router.get('/search', search)
router.get('/detail/:id',detail)


module.exports = router;
