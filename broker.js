// broker.js
const mosca = require('mosca');
var settings = {
    port: 1883
};

const server = new mosca.Server(settings);
const defaultCmd = {
    fx: 5,
    spd: 200
};
const lastCommandBuffer = Buffer.from(JSON.stringify(defaultCmd));

server.on('clientConnected', function (client) {
    console.log('client connected', client.id);
    server.publish(lastCommandBuffer, client);
});

// fired when a message is received
server.on('published', function (packet, client) {
    const msgString = JSON.parse(packet.payload.toString());
    console.log('got published: ', msgString);
    lastCommandBuffer = packet.payload;

});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}