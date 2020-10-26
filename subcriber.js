// subscriber.js
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://192.168.1.200')
client.on('connect',  () => {
    client.subscribe('myhome')
})
client.on('message',  (topic, message) => {
context = message.toString();
console.log(context)
})