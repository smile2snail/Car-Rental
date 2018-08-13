'use strict';

var mongoose = require('mongoose');

var modelModel = function(){
  var modelSchema = mongoose.Schema({
    name: String
  });


  return mongoose.model('model',modelSchema);
}

module.exports = new modelModel();
