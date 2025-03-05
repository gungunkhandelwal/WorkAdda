require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const User = require("./models/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const ejsMate = require("ejs-mate");
const user= require("./routes/user.js");
const flash =require("connect-flash");
const List =require("./models/List.js")

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
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// const dbUrl ="mongodb+srv://gumo:0115072003@cluster0.dxvnsmx.mongodb.net/";
const dbUrl = "mongodb://127.0.0.1:27017/NotesAdda";

main()
  .then((res) => {
    console.log("successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});
const sessionOptions = {
  secret: "OurFirstProject",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});



app.use("/",user);

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


app.listen(8080,()=>{
    console.log("listening is 8080");
})