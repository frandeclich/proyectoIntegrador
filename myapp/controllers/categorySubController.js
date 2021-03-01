const mock_db=require('../data/productsData')
const path = require('path');
const {getMock} = require(path.join('..','data','productsData'));
const allProducts = getMock()


module.exports={
    vinilos: (req,res)=>{
        let products = allProducts.filter(product=>{
            return product.category=="vinilo"
        })
        let featured = products.filter(product=>{
            return product.featured==true
        })
        res.render('categorySub',{
            title: 'Vinilos',
            products,
            featured
        })
    },
    cds:(req,res)=>{
        let products = allProducts.filter(product=>{
            return product.category=="cd"
        })
        let featured = products.filter(product=>{
            return product.featured==true
        })
        res.render('categorySub',{
            title: "CD'S",
            products,
            featured
        })
    },
    cassettes:(req,res)=>{
        let products = allProducts.filter(product=>{
            return product.category=="cassette"
        })
        let featured = products.filter(product=>{
            return product.featured==true
        })
        res.render('categorySub',{
            title:'Cassettes',
            products,
            featured
        })
    },
    speakers:(req,res)=>{
        let products = allProducts.filter(product=>{
            return product.category=="speaker"
        })
        let featured = products.filter(product=>{
            return product.featured==true
        })
        res.render('categorySub',{
            title:'Periféricos',
            products,
            featured
        })
    }

}