const bookModel = require("../models/books.js");

exports.showBooks=async (request, response) => {
    try {
      const books = await bookModel.find({});
      response.send(books);
    } catch (error) {
      response.status(500).send(error);
    }
  };


exports.addBook=async (request, response) => {
    try {
      const book = new bookModel(request.body);
      await book.save();
      response.send({'code':0,'message':"book added successfully"});
    } catch (error) {
      response.status(500).send(error);
    }
};

exports.updateBook=async (request,response)=>{
    try {
        await bookModel.findByIdAndUpdate(request.params.id, request.body);
        await bookModel.save();
        response.send({'code':0,'message':"book updated successfully"});
      } catch (error) {
        response.status(500).send(error);
      }
};

exports.deleteBook=async (request,response)=>{
    try {
        const book = await bookModel.findByIdAndDelete(request.params.id);
      } catch (error) {
        response.status(500).send(error);
      }
      if (!book) response.status(404).send("No item found");
      response.status(200).send();
};

exports.availableBooks=async (request, response) => {
    try {
      const books = await bookModel.find({"status":"true"},{"title":1,"copies":1});
      if (!books) response.status(404).send("No item found");
      response.send(books);
    } catch (error) {
      response.status(500).send(error);
    }
  };
 
exports.getBook=async (request,response)=>{
    try {
        const book = await bookModel.findById(request.params.id,{"title":1,"copies":1,"status":1});
        if(!book || book['status']!=true){
            response.status(404).send("Book not available");
        }
        response.send(book);
      } catch (error) {
        response.status(500).send(error);
      }
};  