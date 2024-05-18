const mongoose=require("mongoose");

const Schema=mongoose.Schema;


const SubjectSchema = new Schema({
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

const Subject =mongoose.model("Subject",SubjectSchema);
module.exports = Subject;
