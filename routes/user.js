const express =require("express");
const router=express.Router();
const User =require("../models/user.js");
const passport=require("passport");
const { saveRedirectUrl }=require("../middleware.js")


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",async(req,res)=>{
    try{
        let {username ,email,password}= req.body;
    const newUser=new User({email,username});
  const registeredUser= await  User.register(newUser,password);
  req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","You Enter In NotesAdda");
    res.redirect("/Notes");
  })
    
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}
    
});

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect :"/login",failureFlash:true}),async(req,res)=>{
    req.flash("success","welcome to NoteAdda! you are logged in!");
    let redirectUrl =res.locals.redirectUrl || "/Notes";
    res.redirect(redirectUrl);

});


module.exports=router;