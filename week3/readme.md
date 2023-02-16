# Samen een recepten wedstrijd API bouwen!

https://tinyurl.com/3kfkfn8h

Het grote stappenplan. 

1. express gebruiken voor de API
    a) Express-generator
    b) Alles met de hand!

Voer het commando uit:
```npm
npm i -g express-generator
express BakR
cd BakR
npm i
```

Tijd om het uit te proberen. 
We gaan eerst Nodemon installeren

```npm 
npm i -g nodemon 
```

Pas de package.json aan. 

Tijd voor de eerste router!
Rename indexrouter naar receptrouter en pas dit aan in de: 
* filename
* regel 7
* regel 18

2. MongoDB er achter zetten


Mongoose installeren

```npm
npm i --save mongoose
```

Maak een folder 'models'
Maak een bestand recept.js

Stijn's epische testdata:

```json
{
    "naam": "Het lekkerste worstenbroodje",
    "chef": "Stijn Le Smulders",
    "ingrediënten": [
       { "body": "ei", "hoeveelheid": [3, "middelgroot"]},
       { "body": "zout", "hoeveelheid": "snufje"}
    ]
}
```

3. Een test schrijven om te kijken of het werkt!
