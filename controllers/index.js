'use strict';

var Car = require('../models/carModel');


module.exports = function (router) {
    router.get('/', function (req, res) {
      Car.find({},function(err,cars){
        if(err){
          console.log(err);
        }

        cars.forEach(function(car){
          car.truncText = car.truncText(90);
        });

        var model = {
          cars:cars
        }
        res.render('index',model);
      });
    });
};
