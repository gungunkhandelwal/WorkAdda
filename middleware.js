const { ProgramSchema, SubjectSchema } = require("./Schema");
const ExpressError = require("./utilies/ExpressError");

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
