const express =require("express");
const app =express();
const router=express.Router();
const List =require("../models/List.js")


//Index route
router.get("/",async(req,res)=>{
    const allNotes= await List.find({});
    res.render("Program/index.ejs",{allNotes});
});

//show route
router.get("/:id",async(req,res)=>{
    let { id } =req.params;
    const note =await List.findById(id);
    res.render("Program/show.ejs",{note});
});
module.exports = router;