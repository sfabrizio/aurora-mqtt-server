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

//let lastCommandBuffer = Buffer.from(JSON.stringify(defaultCmd));
let lastCommandBuffer = false;
let lastClient;

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
    if (!lastCommandBuffer) {
        return;
    }
    lastClient = client;
    console.log("waiting 7s to re publish cmd");
    setTimeout(sendLastCmd, 7000);
});

function sendLastCmd() {
    console.log("re publishing last cmd");
    server.publish({
        topic: 'myhome',
        payload: lastCommandBuffer
    }, lastClient);

}

// fired when a message is received
server.on('published', function(packet, client) {
    const msgString = packet.payload.toString();
    console.log('got published: ', msgString);
    if (msgString.includes("{'cmd':'fx'")) {
        console.log('storing cmd');
        lastCommandBuffer = packet.payload;
    }

});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}
