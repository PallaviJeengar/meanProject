const mongoose = require("mongoose");
const {v4 : uuidv4} = require('uuid')
const { injectUUID } = require("mongoose-uuid-parser");
injectUUID(mongoose);

let address=mongoose.Schema({
    city:String,
    state:String,
    flatNo:Number
});

let UserSchema = new mongoose.Schema({
    id: String,
    firstName:String,
    lastName:String,
    email:String,
    mobileNumber:String,
    bookIssued:String,
    address:{
        type:address
    }
  });

UserSchema.pre("save",function(next) {
    this.id=uuidv4();
    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;