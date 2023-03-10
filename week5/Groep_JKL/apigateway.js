const express = require('express');
let dotenv = require('dotenv');
const { Proxy} = require('axios-express-proxy');

dotenv.config();


let app = express();
app.use(express.json()); //json
const CircuitBreaker = require('opossum');

//Voor is dat fetch
function asyncFunctionThatCouldFail(x, y) {
  return new Promise((resolve, reject) => {
    // Do something, maybe on the network or a disk
  });
}

const options = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000 // After 30 seconds, try again.
};


app.post('/blog', (req, res) => {

    let host = process.env.BLOGSERVICE;
    host = "http://localhost:3001" + req.originalUrl
    return Proxy(host, req, res);

    //Opdracht: Combineer dit met de circuitbreaker!
    // const breaker = new CircuitBreaker(fetchBlog, options);
    // breaker.fire(req, res) //Stuur maar door over de circuit breaker
    //     .then(console.log)
    //     .catch(console.error);
    
});


app.listen(3000, () => {
    console.log('API Gateway listening on port 3000!');
});