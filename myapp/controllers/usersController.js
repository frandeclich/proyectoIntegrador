const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const {check, validationResult, body} = require('express-validator');

const {getUsers, setUser}=require(path.join('..','data','usersData'))
let users=getUsers()


module.exports={
    login: (req,res)=>{
        res.render('login',{
            title:'Iniciar Sesión' 
        })
    },
    register: (req,res)=>{  
        res.render('register',{
            title:'Registrate'
        })
    },
    processLogin:(req,res)=>{
        const {email,pass,rememberme} = req.body

        let userResult = users.find(user => user.email === email.trim())
        if (userResult) {
            if (bcrypt.compareSync(pass.trim(),userResult.pass)) {
                req.session.user = userResult
                if (rememberme != undefined) {
                    res.cookie('rememberme',userResult.email,{maxAge: 60000})  
                }
                return res.redirect('/user/profile')  
                
            }
        }
        res.render('login',{
            title:'Error en el login.',
            error: 'Los datos enviados no coinciden con los datos de ningún usuario.'
        })
    },
    processRegister:(req,res)=>{
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            
            return res.render('register',{
                title:'Formulario inválido',
                errors:errors.mapped(),
                old : req.body
            })
        }

        const {email,pass} = req.body

        let lastID = 0;
        users.forEach(user => {
            if (user.id > lastID) {
                lastID = user.id
            }
        });

        let passHash = bcrypt.hashSync(pass.trim(),12)

        const newUser = {
            id : +lastID + 1,
            email,
            pass : passHash
        }
        users.push(newUser)

        setUser(users);

        res.redirect('/user/login')
    },
    logout:(req,res)=>{       
        delete req.session.user
        res.cookie('rememberme','',{maxAge: -1})
        res.redirect('/user/login')
    },
    micarrito: (req,res)=>{
        res.render('micarrito',{
            title:'Tu carrito'
        })
    },
    profile: (req,res)=>{
        let user = req.session.user
        res.render('profile',{
            title:'Tu perfil',
            /* user */
        })
    }
}