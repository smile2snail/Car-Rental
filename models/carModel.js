'use strict';

var mongoose = require('mongoose');

var carModel = function(){
  var carSchema = mongoose.Schema({
    title: String,
    category: String,
    description: String,
    author: String,
    publisher: String,
    price: Number,
    cover: String
  });

  //Shorten Text
  carSchema.methods.truncText = function(length){
    return this.description.substring(0,length);
  }


  return mongoose.model('car',carSchema);
}

module.exports = new carModel();
