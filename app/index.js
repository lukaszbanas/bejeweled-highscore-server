const {Highscores} = require('./class/Highscores')

const http = require('http')
const express = require('express')
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let list = new Highscores();
list.load();

wss.on('connection', ws => {
    ws.on('message', scoreStr => {
        let data = JSON.parse(scoreStr)

        list.add({'name': data.name, 'score': data.score})

        wss.clients.forEach(function each (client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(list.get()); //send updated list to clients
            }
        });
    })

    ws.send(list.get());
});

server.listen(process.env.PORT || 3000)