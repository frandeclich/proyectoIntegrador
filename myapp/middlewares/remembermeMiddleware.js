const db = require("../database/models");

function remembermeMiddleware(req,res,next) {
    
    if (req.cookies.rememberme != undefined && req.session.user == undefined) {
        db.User.findOne({
            where:{email:req.cookies.rememberme}
        })
            .then((userResult)=>{
                req.session.user = userResult 
            }) 
    }
    next()
    
}

module.exports = remembermeMiddleware