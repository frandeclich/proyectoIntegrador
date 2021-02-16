module.exports={
    vinilos: (req,res)=>{
        res.render('categorySub',{
            title: 'Vinilos'
        })
    },
    cds:(req,res)=>{
        res.render('categorySub',{
            title: "CD'S"
        })
    },
    cassettes:(req,res)=>{
        res.render('categorySub',{
            title:'Cassettes'
        })
    },
    speakers:(req,res)=>{
        res.render('categorySub',{
            title:'Periféricos'
        })
    }

}