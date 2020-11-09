const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const BookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    ganre:{
        type:String,
        required:true
    },
    author:{
        type:String,
        rquired:true

    },
    read:{
        type:Boolean,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Book",BookSchema);
