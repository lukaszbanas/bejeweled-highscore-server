"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const Highscores_1 = require("./class/Highscores");
const app = express_1.default();
const server = http_1.default.createServer(app);
const wss = new ws_1.default.Server({ server });
let list = new Highscores_1.Highscores();
list.load();
wss.on('connection', ws => {
    ws.on('message', scoreStr => {
        let data = JSON.parse(typeof scoreStr === "string" ? scoreStr : '');
        list.add({ 'name': data.name, 'score': data.score });
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(list.get()); // send updated list to clients
            }
        });
    });
    ws.send(list.get());
});
server.listen(process.env.PORT || 3000);
