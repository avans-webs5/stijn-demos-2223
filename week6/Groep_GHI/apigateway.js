const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
//const proxy = require('axios-express-proxy'); //you fool of a took - deprecated
var proxy = require('express-http-proxy');
const CircuitBreaker = require('opossum');
const jwt  = require('jsonwebtoken');

dotenv.config()
 
const BLOGSERVICE = process.env.BLOGSERVICE;
const COMMENTSERVICE = process.env.COMMENTSERVICE;

let app = express();
app.use(express.json()); //json 

const options = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000 // After 30 seconds, try again.
};


const breaker = new CircuitBreaker(proxy, options);

app.post('/blog', proxy(BLOGSERVICE)); 
app.post('/comment', proxy(COMMENTSERVICE));

app.listen(3000, () => {
    console.log('API Gateway started on port 3000')
});
