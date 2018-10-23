"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite = require('sqlite3');
class Highscores {
    constructor() {
        this.list = [];
    }
    loadData() {
        return new Promise(function (resolve, reject) {
            let db = new sqlite.Database('./scores.sqlite');
            // @ts-ignore
            db.all('SELECT name,score FROM Scores ORDER BY score DESC', [], (error, result) => {
                resolve(result);
            });
            db.close();
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadData().then(result => {
                // @ts-ignore
                this.list = result;
            });
        });
    }
    add(entry) {
        let db = new sqlite.Database('./scores.sqlite');
        db.run('INSERT INTO Scores(`name`, `score`) VALUES (?, ?)', [entry.name, entry.score]);
        db.close();
    }
    get() {
        this.load();
        return this.toString();
    }
    toString() {
        return JSON.stringify(this.list);
    }
}
exports.Highscores = Highscores;
