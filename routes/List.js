const mongoose=require("mongoose");

const Schema=mongoose.Schema;


const ListSchema = new Schema({
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
        link:String,
    },
})

const List =mongoose.model("List",ListSchema);
module.exports = List;