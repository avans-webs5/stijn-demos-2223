const express = require('express');
const fs   = require('fs');
const jwt  = require('jsonwebtoken'); //advies: gebruik passport

let app = express();
app.use(express.json()); //json 

// PRIVATE and PUBLIC key
var privateKEY  = fs.readFileSync('./keys/private.key', 'utf8');
//var publicKEY  = fs.readFileSync('./keys/public.key', 'utf8');

var i  = 'Mysoft corp';          // Issuer 
var s  = 'some@user.com';        // Subject 
var a  = 'http://mysoftcorp.in'; // Audience

// SIGNING OPTIONS
var signOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "1h",
    algorithm:  "RS256" 
   };

//NIET ECHT REST
app.post('/login', (req, res) => {

    if(req.body.password == "Pa$$word")
    {
        var token = jwt.sign({
            secretmessage: 'Stijn = cool'
        }, privateKEY, signOptions);

        res.send(token);
    }
    else {
        res.send("no");
    }
});

app.listen(3003, () => {
  console.log('Auth service started on port 3003');
});