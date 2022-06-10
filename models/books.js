const mongoose = require("mongoose");
const {v4 : uuidv4} = require('uuid')

let author=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String
});

let BookSchema = new mongoose.Schema({
    id: String,
    title:String,
    genre:String,
    copies:Number,
    status:Boolean,
    author:{
        type:author
    }
  });

BookSchema.pre("save",function(next) {
    this.id=uuidv4();
    next();
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;