const mongoose=require("mongoose");

const Schema=mongoose.Schema;


const ProgramSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        url:String,
    },
    pdf:{
        link: {
            type:String,
        }
    },
})

const Program =mongoose.model("Program",ProgramSchema);
module.exports = Program;
