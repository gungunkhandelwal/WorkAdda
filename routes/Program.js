const express =require("express");
const app =express();
const router=express.Router();
const Program =require("../models/Program.js")


//Index route
router.get("/",async(req,res)=>{
    const allNotes= await Program.find({});
    res.render("Program/index.ejs",{allNotes});
});

//show route
router.get("/:id",async(req,res)=>{
    let { id } =req.params;
    const note =await Program.findById(id);
    res.render("Program/show.ejs",{note});
});
module.exports = router;