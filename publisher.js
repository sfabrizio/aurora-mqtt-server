// #publisher.js
const process = require('process');
const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://192.168.1.200');

const effectNumber = process.argv[2] || 1;
const speed = process.argv[3] || 0;
const off = process.argv[4] || null;

client.on('connect', () => {
    if (off) {
        client.publish('myhome', `{"cmd":"off","payload":""}`);
        process.exit(code=0)
        return;
    }
    if (effectNumber == "setRGB") {
        client.publish('myhome', `{"cmd":"setRGB","payload":"${speed}"}`);
        process.exit(code=0)
    }
    client.publish('myhome', `{"cmd":"fx","payload":"${effectNumber}"}`);
    client.publish('myhome', `{"cmd":"spd","payload":"${speed}"}`);
    process.exit(code=0)
});

