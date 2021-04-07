const db = require("../database/models");
function onlyYourProductsMiddleware(req,res,next) {
    db.Product.findOne({where:{id:req.params.id}})
        .then((product)=>{
            if (product) {
                if (product.admin_id == req.session.user.id) {
                    next()
                }
                else{
                    res.redirect('/admin/products')
                }
            }
            else{
                res.redirect('/admin/products')
            }
        })
}

module.exports = onlyYourProductsMiddleware