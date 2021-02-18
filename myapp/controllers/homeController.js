const { get } = require('http');
const path = require('path');
const {getMock} = require(path.join('..','data','productsData'));

module.exports={
    home: (req,res)=>{
        let featured = getMock().filter(product=>{
            return product.featured==true
        })

        res.render('home',{
            title:'Inicio',
            products:getMock,
            featured
        })
    },
    search: (req,res)=>{
        const products = getMock().filter(product => {
            return product.title.toLowerCase().includes(req.query.search.toLowerCase())
        })
        let query=req.query.search
        res.render('search',{
            title:'Resultado de tu búsqueda "'+query+'"',
            products,
            query
        })
        
    },
    detail:(req,res)=>{
        let product = getMock().find(product=>product.id ===  Number(req.params.id));

        /* res.send(product) */
        res.render('detail',{
            title:'Detalle del producto "'+product.title+'"',
            products:getMock,
            product
        })
    }
}

