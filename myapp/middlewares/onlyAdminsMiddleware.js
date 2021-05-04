function onlyAdminsMiddleware(req,res,next) {
    if (req.session.user && (req.session.user.role==1 || req.session.user.id==1)) {
        next()
    }else{
        res.redirect('/user/login')
    }
}

module.exports = onlyAdminsMiddleware