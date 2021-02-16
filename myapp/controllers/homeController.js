module.exports={
    home: (req,res)=>{
        res.render('home',{
            title:'Inicio'})
    },
    search: (req,res)=>{
        res.render('search',{
            title:'Resultado de tu búsqueda'
        })
    },
    detail:(req,res)=>{
        res.render('detail',{
            title:'Detalle del producto'
        })
    }
}