const express = require("express");
const app = express();
const router = express.Router();
const Subject = require("../models/Subject.js");
const { isLoggedIn, validateSubject } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudinaryConfigure.js");
const upload = multer({ storage });

//Index route
router.get("/", async (req, res) => {
  const allNotes = await Subject.find({});
  res.render("Subject/index.ejs", { allNotes });
});
//new route

router.get("/new", isLoggedIn, async (req, res) => {
  res.render("Subject/new.ejs");
});
//show route
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  const note = await Subject.findById(id);
  res.render("Subject/show.ejs", { note });
});

//create route
router.post(
  "/",
  isLoggedIn,
  validateSubject,
  upload.single("Subject[image]"),
  async (req, res) => {
    let url = req.file.path;
    const newSubject = new Subject(req.body.Subject);
    newSubject.image = { url };
    let savedSubject = await newSubject.save();
    res.redirect("/Subject");
  }
);

//edit route
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  const subject = await Subject.findById(id);
  if (!subject) {
    res.redirect("/Subject");
  }
  let originalImageUrl = subject.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_150");
  res.render("Subject/edit.ejs", { Subject, originalImageUrl });
});

//update route
router.put(
  "/:id",
  isLoggedIn,
  validateSubject,
  upload.single("Subject[image]"),
  async (req, res) => {
    let { id } = req.params;
    let Subject = await Subject.findByIdAndUpdate(id, { ...req.body.Subject });
    if (typeof req.file != "undefined") {
      let url = req.file.path;
      Subject.image = { url };
      await Subject.save();
    }
    res.redirect("/Subject");
  }
);

//delete route

router.delete("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  let deleteSubject = await Subject.findByIdAndDelete(id);
  req.flash("success", "Subject Deleted");
  res.redirect("/Subject");
});
module.exports = router;
