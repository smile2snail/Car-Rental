'use strict';

var car = require('../models/carModel');
var model = require('../models/modelModel');

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('manage/index');
    });

    //Get cars
    router.get('/cars', function (req, res) {
      car.find({},function(err,cars){
        if(err){
          console.log(err);
        }

        var model = {
          cars:cars
        }
        res.render('manage/cars/index',model);
      });
    });
    //Add car Form
    router.get('/cars/add',function(req,res){
      model.find({},function(err,models){
        if(err){
          console.log(err);
        }

        var model = {
          models:models
        }

        res.render('manage/cars/add',model);
      });
    });
    //Add car
    router.post('/cars', function(req, res){
        var title = req.body.title && req.body.title.trim();
        var model = req.body.model && req.body.model.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var description= req.body.description && req.body.description.trim();
        var title = req.body.title && req.body.title.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if (title == '' || price == '') {
            req.flash('error', "Please fill out required fields");
            res.location('/manage/cars/add');
            return res.redirect('/manage/cars/add');
        }

        if(isNaN(price)){
            req.flash('error', "Price must be a number");
            res.location('/manage/cars/add');
            return res.redirect('/manage/cars/add');
        }

        var newcar = new car({
            title: title,
            model: model,
            description: description,
            author: author,
            publisher: publisher,
            cover: cover,
            price: price
        });

        newcar.save(function(err){
            if(err) {
                console.log('save error', err);
            }

            req.flash('success', "Car Added");
            res.location('/manage/cars');
            res.redirect('/manage/cars');
        });
    });
    //Edit car
    router.get('/cars/edit/:id', function (req, res) {
        model.find({},function(err,models) {
          car.findOne({_id:req.params.id},function (err, car) {
            if (err) {
              console.log(err);
            }
            var model ={
              car: car,
              models: models
            };
            res.render('manage/cars/edit', model);
          });
        });
    });

    //Update car
    router.post('/cars/edit/:id', function(req, res){
        var title = req.body.title && req.body.title.trim();
        var model = req.body.model && req.body.model.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var description= req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim();


        car.update({_id: req.params.id}, {
            title:title,
            model: model,
            author: author,
            publisher: publisher,
            price: price,
            description: description,
            cover: cover

        }, function(err) {
            if(err) {
                console.log('update error', err);
            }

            req.flash('success', "Car Updated");
            res.location('/manage/cars');
            res.redirect('/manage/cars');
        });

    });

    //Delete cars
    router.post('/cars/delete/:id', function (req, res) {
            car.remove({_id: req.params.id}, function (err) {
                if (err) {
                    console.log(err);
                }
                req.flash('success', "Car Deleted");
                res.location('/manage/cars');
                res.redirect('/manage/cars');
            });
    });

    //Get models
    router.get('/models', function (req, res) {
        model.find({}, function(err, models){
            if(err){
                console.log(err);
            }

            var model = {
                models: models
            };

            res.render('manage/models/index', model);
        });
    });

    // Display model add form
    router.get('/models/add', function (req, res) {
      res.render('manage/models/add');
    });

    // Add a new model
    router.post('/models', function(req, res){
        var name= req.body.name && req.body.name.trim();

        if (name == '') {
            req.flash('error', "Please fill out required fields");
            res.location('/manage/models/add');
            return res.redirect('/manage/models/add');
        }

        var newmodel = new model({
            name:name
        });

        newmodel.save(function(err) {
            if(err) {
                console.log('save error', err);
            }

            req.flash('success', "Model Added");
            res.location('/manage/models');
            res.redirect('/manage/models');
        });

    });

    // Display model edit form
    router.get('/models/edit/:id', function (req, res) {
         model.findOne({_id:req.params.id},function (err, model) {
            if (err) {
                console.log(err);
            }
            var model ={
                model: model
            };
            res.render('manage/models/edit', model);
        });
    });

    // Edit model
    router.post('/models/edit/:id', function(req, res){
        var name= req.body.name && req.body.name.trim();

        model.update({_id: req.params.id}, {
            name:name
        }, function(err) {
            if(err) {
                console.log('update error', err);
            }

            req.flash('success', "Model Updated");
            res.location('/manage/models');
            res.redirect('/manage/models');
        });

    });

    // Delete model
    router.post('/models/delete/:id', function (req, res) {
        model.remove({_id: req.params.id}, function (err) {
            if (err) {
                console.log(err);
            }
            req.flash('success', "Model Deleted");
            res.location('/manage/models');
            res.redirect('/manage/models');
        });
    });

};
