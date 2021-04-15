function onlySuperadminMiddleware(req,res,next) {
    if (req.session.user && req.session.user.email == "fdeclich1@gmail.com") {
        next()
    }else{
        res.redirect('/admin/products')
    }
}

module.exports = onlySuperadminMiddleware