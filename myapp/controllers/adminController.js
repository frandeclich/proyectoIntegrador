const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const {check, validationResult, body} = require('express-validator');


const {getMock,setMock} = require(path.join('..','data','productsData'))

const products = getMock()




module.exports = {
    

    
    productsList : (req,res) => {
        
        res.render('admin/products',{
            title:'Listado de productos',
            products
        })
    },
    productsSearch : (req,res)=>{
        const productsFilter = products.filter(product => {
            return product.title.toLowerCase().includes(req.query.search.toLowerCase())
        })
        res.render('admin/products',{
            title:'Resultado de la búsqueda',
            products:productsFilter,
            busqueda:req.query.search
        })
    },
    productsCreate : (req,res) => {

        res.render('admin/productsCreate',{
            title:'Crear un nuevo producto'
        })
    },
    productsStore : (req,res,next) => {
        
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            if (req.files[0]) {
                
                if(fs.existsSync(path.join('public','images',req.files[0].filename))){
                    fs.unlinkSync(path.join('public','images',req.files[0].filename))
                    
                }                  
                
            }

            return res.render('admin/productsCreate',{
               title: 'Realice el formulario otra vez.',
               errors: errors.mapped(),
               old: req.body
            })
        } else {
            
        

        let lastID = 1;
        products.forEach(product => {
            if (product.id > lastID) {
                lastID = product.id
            }
        });

        const {title,description,condition,price,featured,category} = req.body;

        var image = "acdc-1.jpg"

        if (req.files[0]) {
            var image = req.files[0].filename
        }

        const product = {
            id: Number(lastID + 1),
            title,
            description,
            condition:Boolean(condition),
            featured:Boolean(featured),
            price,
            image,
            category
        }

        products.push(product)

        setMock(products);
        res.redirect('/admin/products');

        res.send(req.body)
        }   
    },
    productsEdit : (req,res) => {
        
        const product = products.find(product => product.id === +req.params.id);

        res.render('admin/productsEdit',{
            product,
            title:'Edita tu producto'
        })
    },
    productsUpdate : (req,res,next) => {
        const {title,description,condition,price,featured,category} = req.body;

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            if (req.files[0]) {
                
                if(fs.existsSync(path.join('public','images',req.files[0].filename))){
                    fs.unlinkSync(path.join('public','images',req.files[0].filename))    
                }                                 
            }
            const product = products.find(product => product.id === +req.params.id);
            return res.render('admin/productsEdit',{
               title: 'Realice el formulario otra vez.',
               errors: errors.mapped(),
               product
            })
        } else {

        products.forEach(product => {
            if(product.id === +req.params.id){
                
                product.id = Number(req.params.id);
                product.title = title;
                product.description = description;
                product.condition=Boolean(condition);
                product.featured=Boolean(featured);
                product.price = price;
                if (req.files[0]) {
                    if (product.image) {
                        if(fs.existsSync(path.join('public','images',product.image))){
                            fs.unlinkSync(path.join('public','images',product.image))
                            product.image = req.files[0].filename
                        }
                    }
                }
                product.category = category
                
                
                
            }
        });

        setMock(products);
        res.redirect('/admin/products');
    }
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




