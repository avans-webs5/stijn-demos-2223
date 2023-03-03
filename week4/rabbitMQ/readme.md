# Notes

Iets met docker

``` 
docker pull rabbitmq:3-management
```

(Moet docker wel opstarten - docker desktop )

Daarna runnen

``` 
docker run -d -p 15672:15672 -p 5672:5672 --name rabbit-test-for-medium rabbitmq:3-management
```

Kan nu rabit MQ opstarten via Docker Desktop
Inloggen met Guest - Guest

# https://tinyurl.com/4ybbcetu