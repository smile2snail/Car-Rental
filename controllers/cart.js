'use strict';
var car = require('../models/carModel');
var Model = require('../models/modelModel');

module.exports = function(router){
  router.get('/',function(req,res){
    //Get cart from session
    var cart = req.session.cart;
    var displayCart = {items: [], total:0};
    var total = 0;

    //Get total
    for(var item in cart){
      displayCart.items.push(cart[item]);
      total += (cart[item].qty * (cart[item]).price);
    }
    displayCart.total = total;
    //Render cart
    res.render('cart/index', {
      cart: displayCart
    });
  });

  router.post('/:id',function(req,res){
    req.session.cart = req.session.cart || {};
    var cart = req.session.cart;

    car.findOne({_id:req.params.id}, function(err,car){
      if(err){
        console.log(err);
      }

      if(cart[req.params.id]){
          cart[req.params.id].qty++
      }else{
        cart[req.params.id] = {
          item: car._id,
          title: car.title,
          price: car.price,
          qty: 1
        }
      }

      res.redirect('/cart');
    });
  });

  // Empty Carts
  router.get('/delete', function (req, res) {
      console.log('I am here');
  });
}
