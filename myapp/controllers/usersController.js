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
    }
}