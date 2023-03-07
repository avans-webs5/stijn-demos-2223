const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
const proxy = require('axios-express-proxy');

dotenv.config()
 
const BLOGSERVICE = process.env.BLOGSERVICE;
const COMMENTSERVICE = process.env.COMMENTSERVICE;

let app = express();
const expressSwagger = require('express-swagger-generator')(app);
app.use(express.json()); //json 

const CircuitBreaker = require('opossum');

const options = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000 // After 30 seconds, try again.
};


const breaker = new CircuitBreaker(proxy.Proxy, options);


app.post('/blog', forward(BLOGSERVICE)); 
app.post('/comment', forward(COMMENTSERVICE));

const swaggeroptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "LogRocket Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./blogservice.js"],
  };
  
  const specs = swaggerJsdoc(swaggeroptions);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );


app.listen(3000, () => {
    console.log('API Gateway started on port 3000')
});

function forward(service) {
    return (req, res) => {
        breaker.fire(service + req.originalUrl, req, res);
    }
}