#Aurora mqtt server

Simple mqtt implementation over node.js for (https://github.com/garhul/aurora)[Aurora] project. 


# Install 

```
npm install
```

# Run

## Broker:

```
node broker.js
```


## Publisher:

Turn on effect `1` on speed `255`

```
node publisher.js 1 255
```
Turn OFF

```
node publisher.js 1 255 OFF
```

# Subscriber

Just if you need to test what is going on:
```
node subscriber.js
```

#Related Projects:

- (https://github.com/garhul/aurora)[aurora]
- (https://github.com/sfabrizio/aurora-alexa)[aurora-alexa]

Thanks to @garhul for (https://github.com/garhul/aurora)[aurora]