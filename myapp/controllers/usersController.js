const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');

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
        const {email,pass} = req.body

        let userResult = users.find(user => user.email === email.trim())
        if (userResult) {
            if (bcrypt.compareSync(pass.trim(),userResult.pass)) {
                return res.send(userResult)
            }
        }
        res.render('login',{
            title:'Error'
        })
    },
    processRegister:(req,res)=>{
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

        res.send(req.body)
        res.redirect('/users/login')
    },
    micarrito: (req,res)=>{
        res.render('micarrito',{
            title:'Mi carrito'
        })
    }
}