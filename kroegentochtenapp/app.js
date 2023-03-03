
let http = require('http'); //straks!
let express = require('express');
let bodyParser = require('body-parser')
let mongoose = require('mongoose');

//DATABASE SHIZZLE
mongoose.connect('mongodb://127.0.0.1:27017/myapp');
mongoose.model('kroegentocht', new mongoose.Schema({ name: String }));

//VOLGORDE VOLGORDE VOLGORDE
//require('./models/kroegentocht');
let kroegentochtRouter = require('./routes/kroegentocht');

let app = express();

//DIT IS SUPER BELANGRIJK
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/kroegentocht', kroegentochtRouter);

app.use((req, res) => {
    res.send(404);
})

app.listen(3000); //todo: fix dit