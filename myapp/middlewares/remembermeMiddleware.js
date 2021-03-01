const path = require('path');
const {getUsers, setUser}=require(path.join('..','data','usersData'))
let users=getUsers()


function remembermeMiddleware(req,res,next) {
    
    if (req.cookies.rememberme != undefined && req.session.user == undefined) {
        let userResult = users.find(user => user.email == req.cookies.rememberme)
        req.session.user = userResult    
        console.log(userResult);             
            
        
    }
    next()
    
}

module.exports = remembermeMiddleware