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

Set RGB red color

```
node publisher.js setRGB "255 0 0"
```

### Subscriber

Just if you need to test what is going on:

```
node subscriber.js
```

## Related Projects:

- [aurora](https://github.com/garhul/aurora) - Light's effects/animations for ws2812, ws2811, ws2813 led strips
- [rc-aurora](https://github.com/sfabrizio/rc-aurora) - Control Aurora devices from an RC control
- [aurora-alexa](https://github.com/sfabrizio/aurora-alexa) - Control Aurora devices from Alexa

Thanks to [@garhul](https://github.com/garhul)!
