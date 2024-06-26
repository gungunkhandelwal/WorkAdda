const express =require("express");
const app =express();
const path=require("path");
const User =require("./models/user.js");
const passport =require("passport");
const LocalStrategy =require("passport-local");
const session =require("express-session");
const ejsMate = require("ejs-mate");
const user= require("./routes/user.js");
const flash =require("connect-flash");

const List =require("./models/List.js");
const Program=require("./models/Program.js")
const NoteRouter=require("./routes/List.js");
const ProgramRouter=require("./routes/Program.js");

const SubjectRouter=require("./routes/Subject.js");


const mongoose =require("mongoose");


main().then((res)=>{
    console.log("successfull");
})
.catch(err =>console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/NotesAdda');
}


app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);



const sessionOptions ={
    secret:"OurFirstProject",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    },
};




app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


app.use("/Notes",NoteRouter);
app.use("/Program",ProgramRouter);

app.use("/Subject",SubjectRouter);

app.use("/",user);



app.listen(8080,()=>{
    console.log("listening is 8080");
})