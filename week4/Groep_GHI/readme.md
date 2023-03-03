# Workshop 4

## Join de sessie: https://tinyurl.com/mw6txevf


Opdracht 1: 
Maak in 1 bestand een micro service met express waarop we een POST hebben die een blog aanmaakt.


``` 
docker pull rabbitmq:3-management
```

(Moet docker wel opstarten - docker desktop )

Daarna runnen

``` 
docker run -d -p 15672:15672 -p 5672:5672 --name rabbit-test-for-medium rabbitmq:3-management
```

Wat zijn die getallen?