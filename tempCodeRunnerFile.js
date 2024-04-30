//index route
app.get("/Notes",async(req,res)=>{
    const allNotes= await List.find({});
    res.render("Notes/index.ejs",{allNotes});
});

//show route
app.get("/Notes/:id",async(req,res)=>{
    let { id } =req.params;
    const note =await List.findById(id);
    res.render("Notes/show.ejs",{note});
})