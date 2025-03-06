const express = require("express");
const router = express.Router();

const Review = require("../models/Review");
const Program = require("../models/Program");
const Subject = require("../models/Subject");
const {
  validateReview,
  isProgramReviewAuthor,
  isSubjectReviewAuthor,
  isLoggedIn,
} = require("../middleware");

// Post Review Route for Program
router.post("/program/:id", isLoggedIn, validateReview, async (req, res) => {
  let program = await Program.findById(req.params.id);
  if (!program) {
    req.flash("error", "Program not found");
    return res.redirect("/Program");
  }

  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  program.reviews.push(newReview);

  await newReview.save();
  await program.save();
  req.flash("success", "New review created");
  res.redirect(`/Program/${program._id}`);
});

// Delete Review Route for Program
router.delete(
  "/program/:id/:reviewId",
  isLoggedIn,
  isProgramReviewAuthor,
  async (req, res) => {
    let { id, reviewId } = req.params;
    await Program.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted");
    res.redirect(`/Program/${id}`);
  }
);

// Post Review Route for Subject
router.post("/subject/:id", isLoggedIn, validateReview, async (req, res) => {
  let subject = await Subject.findById(req.params.id);
  if (!subject) {
    req.flash("error", "Subject not found");
    return res.redirect("/Subject");
  }

  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  subject.reviews.push(newReview);

  await newReview.save();
  await subject.save();
  req.flash("success", "New review created");
  res.redirect(`/Subject/${subject._id}`);
});

// Delete Review Route for Subject
router.delete(
  "/subject/:id/:reviewId",
  isLoggedIn,
  isSubjectReviewAuthor,
  async (req, res) => {
    let { id, reviewId } = req.params;
    await Subject.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted");
    res.redirect(`/Subject/${id}`);
  }
);

module.exports = router;
