
const express = require("express");
const app = express();
const router = express.Router();
const { isLoggedIn, validateProgram } = require("../middleware.js");
const Program = require("../models/Program.js");
const multer = require("multer");
const { storage } = require("../cloudinaryConfigure.js");
const upload = multer({ storage });

//Index route
router.get("/", async (req, res) => {
  const allNotes = await Program.find({});
  res.render("Program/index.ejs", { allNotes });
});
//new route

router.get("/new", isLoggedIn, async (req, res) => {
  res.render("Program/new.ejs");
});

//show route
router.get("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  const note = await Program.findById(id);
  res.render("Program/show.ejs", { note });
});

//create route
router.post(
  "/",
  isLoggedIn,
  validateProgram,
  upload.single("Program[image]"),
  async (req, res) => {
    let url = req.file.path;
    const newProgram = new Program(req.body.Program);
    newProgram.image = { url };
    let savedProgram = await newProgram.save();
    res.redirect("/Program");
  }
);

//edit route
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  const program = await Program.findById(id);
  if (!program) {
    res.redirect("/Program");
  }
  let originalImageUrl = program.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_150");
  res.render("Program/edit.ejs", { program, originalImageUrl });
});

//update route
router.put(
  "/:id",
  isLoggedIn,
  validateProgram,
  upload.single("Program[image]"),
  async (req, res) => {
    let { id } = req.params;
    let program = await Program.findByIdAndUpdate(id, { ...req.body.Program });
    if (typeof req.file != "undefined") {
      let url = req.file.path;
      program.image = { url };
      await program.save();
    }
    res.redirect("/Program");
  }
);

//delete route

router.delete("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  let deleteProgram = await Program.findByIdAndDelete(id);
  req.flash("success", "Program Deleted");
  res.redirect("/Program");
});
module.exports = router;
