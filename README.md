# Aurora mqtt server

Simple mqtt implementation over node.js for [Aurora](https://github.com/garhul/aurora) project. 


# Install 

```
npm install
```

# Run

### Broker:

```
node broker.js
```


### Publisher:

Turn on effect `1` on speed `255`

```
node publisher.js 1 255
```
Turn OFF

```
node publisher.js 1 255 OFF
```

### Subscriber

Just if you need to test what is going on:
```
node subscriber.js
```

## Related Projects:

- [aurora](https://github.com/garhul/aurora)
- [aurora-alexa](https://github.com/sfabrizio/aurora-alexa)

Thanks to [@garhul](https://github.com/garhul)!
