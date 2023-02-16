var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//let recept = require('../models/recept');
let Recept = mongoose.model('recept'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  //Aanpassen!
  Recept.find()
    .exec((err, result) => {
      res.send(result);
    })

});


router.post('/', (req, res, next) => {
  let data = req.body;
  let recept = new Recept(data); //geef de data mee!
  recept.save((err, result) => {
    res.send(recept);
  })
})

router.put('/:id', (req, res, next) => {
  res.send("Updaten!");
})

router.delete('/:id', (req, res, next) => {
  res.send("Deleteten!");
})

module.exports = router;
