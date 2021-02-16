var express = require('express');
const { vinilos, cds, cassettes, speakers } = require('../controllers/categorySubController');
var router = express.Router();
const categoryController=require('../controllers/categorySubController')
const {} =categoryController

router.get('/vinilos',vinilos)
router.get('/cds',cds)
router.get('/cassettes',cassettes)
router.get('/speakers',speakers)

module.exports=router

