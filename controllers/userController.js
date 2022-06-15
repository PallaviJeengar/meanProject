const userModel = require("../models/user.js");
const bookModel = require("../models/books.js");
const jwtToken=require("../utils/jwt.js");
const bcrypt = require('bcrypt');
const { response } = require("../app.js");
const { resolve } = require("app-root-path");

exports.verifyUser=async (request,response) => {  
  try {
    userModel.findOne({email:request.body.email})
    .then(user=>{
      if(!user)
      {
        response.status(404).send({
          'code':-1,
          'message':"no user found"
        })
      }
      else
      {
        bcrypt.compare(request.body.password,user.password,(err,match)=>{
          if(err)
          {
            response.status(500).send({
              'code':-1,
              'message':"incorrect password"
            });
          }
          else if(match)
          {
            const token=jwtToken.generateAccessToken({username: user.email});
            response.status(200).send(
              {
                "token":`${token}`,
                "user":`${user}`
              }
            );
          }
          else
          {
            response.status(500).send({
              'code':-1,
              'message':"incorrect password"
            });
          }
        })
      }
    })
  } catch (error) {
    // response.status(500).send();
  }
}

exports.showUsers=async (request, response) => {
    try {
      const users = await userModel.find({});
      // throw new Error();
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  };


exports.addUser=async (request, response) => {
    try {
      const token = jwtToken.generateAccessToken({username: request.body.email});
      response.append('x-auth-token', token);
      const user = new userModel(request.body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      response.send({'code':0,'message':"user added successfully"});
    } catch (error) {
      response.status(500).send(error);
    }
};

exports.updateUser=async (request,response)=>{
    try {
        const user= await userModel.findByIdAndUpdate(request.params.id, request.body);
        if (!user) {
          response.status(404).send({
            'code':-1,
            'message':"user not found"
          })
          response.end();
        }
        else{
          await user.save();
        response.send({'code':0,'message':"user updated successfully"});
        }
      } catch (error) {
        response.status(500).send(error);
      }
};

exports.deleteUser=async (request,response)=>{
    try {
        const user = await userModel.findByIdAndDelete(request.params.id);
        if (!user) {
          response.status(404).send({
            'code':-1,
            'message':"no user found"
          })};
      } catch (error) {
        response.status(500).send(error);
      }
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
    response.status(200).send({'code':0,'message':"book issued successfully"});
};