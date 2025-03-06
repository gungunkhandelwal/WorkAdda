const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
  },
  pdf: {
    link: {
      type: String,
    },
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Program = mongoose.model("Program", ProgramSchema);
module.exports = Program;
