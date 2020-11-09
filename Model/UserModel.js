const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

var Account = new Schema({
    username:{
        type:String,

    },
    password: {
        type: String,
    }
})

//https://mherman.org/blog/local-authentication-with-passport-and-express-4/

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model("Account",Account);