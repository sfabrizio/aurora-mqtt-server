// broker.js
const mosca = require('mosca');
var settings = {
    interfaces: [{
            type: "mqtt",
            port: 1883
        },
        {
            type: "http",
            port: 1884,
            bundle: true,
            static: './'
        },
    ],
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
    if(String(client.id).indexOf('mqtt') ==! -1) {
        return;
    }
     if(String(client.id).indexOf('rc-aurora') ==! -1) {
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
        console.log('no payload in msg, doing anything');
        return;
    }

    const msgString = packet.payload.toString();

    // for debug most msg received:
    //console.log('msg published: ', msgString);

    if (!msgString.includes("cmd")) {
        return;
    }

    const payloadObj = JSON.parse(msgString.replace(/'/g, '"'));
    if (!payloadObj.cmd) {
        return;
    }

    console.log('cmd received: ', msgString);

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
    } else if (payloadObj.cmd.toLowerCase() == "off") {
        lastFx = lastSpd = null;

    } else {
        lastFx = lastSpd = null;
    }

});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Broker running on ports mqtt/websocket:', settings.interfaces[0].port, settings.interfaces[1].port);
}
