//get kroegentocht
//get kroegentocht/1

let mongoose = require('mongoose');
let Kroegentocht = mongoose.model('kroegentocht');



let express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    Kroegentocht.find()
        .exec((err, result) => {
            res.send(result);
        })
});

router.get('/:id', (req, res, next) => {
    Kroegentocht.find(req.id)
        .exec((err, result) => {
            res.send(result);
        })
});

router.post('/', (req, res, next) => {
    let tocht = new Kroegentocht(req.body);
    tocht.save((err, result) => {
        res.send(result);
    })
})


//return router
module.exports = router;