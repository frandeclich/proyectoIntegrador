const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');


/* const {check, validationResult, body} = require('express-validator'); */

const {getMock,setMock} = require(path.join('..','data','productsData'))

const products = getMock()




module.exports = {
    

    
    productsList : (req,res) => {

        res.render('admin/products',{
            title:'Listado de productos',
            products
        })
    },
    productsCreate : (req,res) => {

        res.render('admin/productsCreate',{
            title:'Crear un nuevo producto'
        })
    },
    productsStore : (req,res,next) => {
        
        let lastID = 1;
        products.forEach(product => {
            if (product.id > lastID) {
                lastID = product.id
            }
        });

        const {title,description,condition,price,featured} = req.body;


        const product = {
            id: Number(lastID + 1),
            title,
            description,
            condition:Boolean(condition),
            featured:Boolean(featured),
            price,
            image : req.files[0].filename,
            
        }

        products.push(product)

        setMock(products);
        res.redirect('/admin/products');

        res.send(req.body)
    },
    productsEdit : (req,res) => {
        
        const product = products.find(product => product.id === +req.params.id);

        res.render('admin/productsEdit',{
            product,
            title:'Edita tu producto'
        })
    },
    productsUpdate : (req,res,next) => {
        const {title,description,condition,price,featured} = req.body;

        products.forEach(product => {
            if(product.id === +req.params.id){
                if (req.files) {
                    if (product.image) {
                        if(fs.existsSync(path.join('public','images',product.image))){
                            fs.unlinkSync(path.join('public','images',product.image))
                        }
                    }
                }
                product.id = Number(req.params.id);
                product.title = title;
                product.description = description;
                product.condition=Boolean(condition);
                product.featured=Boolean(featured);
                product.price = price;
                product.image = req.files[0].filename
                
                
            }
        });

        setMock(products);
        res.redirect('/admin/products');
    },
    productsDelete : (req,res) => {
        products.forEach(product => {
            if(product.id === +req.params.id){

                if (product.image) {
                    if(fs.existsSync(path.join('public','images',product.image))){
                        fs.unlinkSync(path.join('public','images',product.image))
                    }
                }
                var aEliminar = products.indexOf(product);
                products.splice(aEliminar,1)
            }
        });
        
        setMock(products);
        res.redirect('/admin/products');
    }
}




