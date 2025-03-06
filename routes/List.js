
const express = require("express");
const app = express();
const router = express.Router();
const List = require("../models/List.js");

//Home Route
router.get("/", (req, res) => {
  res.render("Notes/Home.ejs");
});

module.exports = router;

