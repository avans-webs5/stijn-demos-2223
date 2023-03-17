const express = require('express');
let dotenv = require('dotenv');
const { Proxy} = require('axios-express-proxy');

dotenv.config();


let app = express();
app.use(express.json()); //json ???
const CircuitBreaker = require('opossum');


const options = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000 // After 30 seconds, try again.
};

const breaker = new CircuitBreaker(Proxy, options);

app.post('/blog', forward(process.env.BLOGSERVICE));
app.post('/comment', forward(process.env.COMMENTSERVICE));

 
function forward(service)
{
  return (req, res) => {
    let host = service; //deze veranderd elke keer?
    host += req.originalUrl;
    //return Proxy(host, req, res);
    breaker.fire(host, req, res);
  }
}


app.listen(3000, () => {
    console.log('API Gateway listening on port 3000!');
});