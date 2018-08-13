'use strict';

var car = require('../models/carModel');
var Category = require('../models/categoryModel');

module.exports = function(router){
  router.get('/',function(req, res){
    res.render('index');
  });

  router.get('/details/:id',function(req, res){
    car.findOne({_id:req.params.id},function(err, car){
      if(err){
        console.log(err);
      }

      var model = {
        car: car
      };

      res.render('cars/details',model);
    });
  });
}
