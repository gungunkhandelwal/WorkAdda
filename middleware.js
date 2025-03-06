const { ProgramSchema, SubjectSchema, reviewSchema } = require("./Schema");
const ExpressError = require("./utilies/ExpressError");
const Review = require("./models/Review");
const Program = require("./models/Program");
const Subject = require("./models/Subject");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in create Notes!");
    return res.redirect("/login");
  }
  next();
};

//this middleware help to came back at that same page when we login

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

//Validation for Program

module.exports.validateProgram = (req, res, next) => {
  let { error } = ProgramSchema.validate(req.body.Program);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};
//Validation for Subject

module.exports.validateSubject = (req, res, next) => {
  let { error } = SubjectSchema.validate(req.body.Subject);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

//Validation for review

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

//Validation for Program Review

module.exports.isProgramOwner = async (req, res, next) => {
  let { id } = req.params;
  let program = await Program.findById(id);

  if (!program) {
    req.flash("error", "Program not found");
    return res.redirect("/Program");
  }

  if (!program.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect("/Program");
  }

  next();
};

module.exports.isProgramReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/Program/${id}`);
  }

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You didn't create this review");
    return res.redirect(`/Program/${id}`);
  }

  next();
};

// Validation for Subject Review

module.exports.isSubjectOwner = async (req, res, next) => {
  let { id } = req.params;
  let subject = await Subject.findById(id);

  if (!subject) {
    req.flash("error", "Subject not found");
    return res.redirect("/Subject");
  }

  if (!subject.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect("/Subject");
  }

  next();
};

module.exports.isSubjectReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/Subject/${id}`);
  }

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You didn't create this review");
    return res.redirect(`/Subject/${id}`);
  }

  next();
};
