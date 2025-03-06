const Joi = require("joi");

module.exports.ProgramSchema = Joi.object({
  Program: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("", null),
    pdf: Joi.string().required(),
  }).required(),
});
module.exports.SubjectSchema = Joi.object({
  Subject: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("", null),
    pdf: Joi.string().required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }).required(),
});
