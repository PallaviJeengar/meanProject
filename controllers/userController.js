const userModel = require("../models/user.js");
const bookModel = require("../models/books.js");
const bookController=require('../controllers/bookController');
const logger=require('../utils/winston');

exports.showUsers=async (request, response) => {
    try {
      // throw new Error("error");
      const users = await userModel.find({});
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  };


exports.addUser=async (request, response) => {
    try {
      const user = new userModel(request.body);
      await user.save();
    } catch (error) {
      response.status(500).send(error);
    }
    response.send({'code':0,'message':"user added successfully"});
};

exports.updateUser=async (request,response)=>{
    try {
        await userModel.findByIdAndUpdate(request.params.id, request.body);
        await userModel.save();
      } catch (error) {
        response.status(500).send(error);
      }
      response.send({'code':0,'message':"user updated successfully"});
};

exports.deleteUser=async (request,response)=>{
    try {
        const user = await userModel.findByIdAndDelete(request.params.id);
      } catch (error) {
        response.status(500).send(error);
      }
      if (!user) response.status(404).send("No item found");
      response.status(200).send();
};

exports.issueBook=async (request,response)=>{
  try {
    const book = await bookModel.findById(request.params.id,{"id":1,"title":1,"copies":1,"status":1});
        if(!book || book['status']!=true){
            response.status(404).send("Book not available");
        }
      let updatedcopies=book['copies']-1;
      let updatedStatus=false;
      let bookIssued=book['id'];
      if(updatedcopies<=0)
      {
        updatedcopies=0;
        updatedStatus=false;
      }
      updatedStatus=true;
      await bookModel.findByIdAndUpdate(request.params.id,{"copies":updatedcopies,"status":updatedStatus});
      await userModel.findByIdAndUpdate(request.params.uid,{"bookIssued":bookIssued});
    } catch (error) {
      response.status(500).send(error);
    }

    response.send({'code':0,'message':"book issued successfully"});
    response.status(200).send();
};