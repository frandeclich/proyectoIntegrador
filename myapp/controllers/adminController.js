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
            image : "acdc-1.jpg",
            /* req.files[0].filename */
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
    productsUpdate : (req,res) => {
        const {title,description,condition,price,featured,image} = req.body;

        products.forEach(product => {
            if(product.id === +req.params.id){
                product.id = Number(req.params.id);
                product.title = title;
                product.description = description;
                product.condition=Boolean(condition);
                productfeatured=Boolean(featured);
                product.price = price;
                product.image=image;
            }
        });

        setMock(products);
        res.redirect('/admin/products');
    },
    productsDelete : (req,res) => {
        products.forEach(product => {
            if(product.id === +req.params.id){

                /* if(fs.existsSync(path.join('public','images',product.image))){
                    fs.unlinkSync(path.join('public','images',product.image))
                } */
                var aEliminar = products.indexOf(product);
                products.splice(aEliminar,1)
            }
        });
        
        setMock(products);
        res.redirect('/admin/products');
    }
}



/* register : (req,res) =>{
        res.render('admin/register')
    },
    login : (req, res) => {
        res.render('admin/login')
    },
    processRegister : (req, res) => {

        const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.render('admin/register',{
                errores : errores.mapped(),
                old : req.body
            })
        }else{

        const {username, pass} = req.body;

        let lastID = 0;
        admins.forEach(admin => {
            if (admin.id > lastID) {
                lastID = admin.id
            }
        });

        let passHash = bcrypt.hashSync(pass.trim(),12)

        const newAdmin = {
            id : +lastID + 1,
            username: username.trim(),
            pass : passHash
        }

        admins.push(newAdmin);

        setAdmins(admins);

        res.redirect('/admin/login');

         }

    },
    processLogin : (req,res) => {
        const {username, pass} = req.body;

        let result = admins.find(admin => admin.username.toLowerCase() === username.toLowerCase().trim());

        if(result){
            if(bcrypt.compareSync(pass.trim(),result.pass)){
                return res.redirect('/admin')
            }
        }
        res.render('admin/login',{
            error : "Credenciales inválidas!"
        })

    },*/