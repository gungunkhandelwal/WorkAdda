const express =require("express");
const app =express();
const router=express.Router();
const Subject =require("../models/Subject.js")


//Index route
router.get("/",async(req,res)=>{
    const allNotes= await Subject.find({});
    res.render("Subject/index.ejs",{allNotes});
});

//show route
router.get("/:id",async(req,res)=>{
    let { id } =req.params;
    const note =await Subject.findById(id);
    if(!req.isAuthenticated()){
        req.session.redirectUrl =req.originalUrl;
        req.flash("error","you must be logged first");
       return  res.redirect("/login");
    }
    res.render("Subject/show.ejs",{note});
});
module.exports = router;