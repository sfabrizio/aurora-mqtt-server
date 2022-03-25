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

let lastFx = null;
let lastSpd = null;
let lastClient = null;

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
    if (!lastFx) {
        return;
    }
    lastClient = client;
    console.log("waiting 5s to re publish cmd");
    setTimeout(sendLastCmd, 5000);
});

function sendLastCmd() {
    console.log("re publishing last cmd");
    server.publish({
        topic: 'myhome',
        payload: lastFx
    }, lastClient);
    if(!lastSpd) {
        return;
    }
    server.publish({
        topic: 'myhome',
        payload: lastSpd
    }, lastClient);

}

// fired when a message is received
server.on('published', function(packet, client) {
    if (!packet || !packet.payload) {
        return;
    }
    const msgString = packet.payload.toString();
    //console.log('got published: ', msgString);
    if (!msgString.includes("{'cmd")) {
        return;
    }

    const payloadObj = JSON.parse(msgString.replace(/'/g, '"'));
    if (!payloadObj.cmd) {
        return;
    }

    if (payloadObj.cmd == "fx") {
        lastFx = JSON.stringify(payloadObj);
        console.log('store last FX as: ', payloadObj);
    } else if (payloadObj.cmd == "setRGB") {
        console.log('store last RGB as: ', payloadObj);
        lastFx = JSON.stringify(payloadObj);
        lastSpd = null;
    } else if (payloadObj.cmd == "spd") {
        console.log('store last SPD as: ', payloadObj);
        lastSpd = JSON.stringify(payloadObj);
    } else if (payloadObj.cmd == "off") {
        lastFx = lastSpd = null;
    } else {
        lastFx = lastSpd = null;
    }

});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up, running and cool');
}
