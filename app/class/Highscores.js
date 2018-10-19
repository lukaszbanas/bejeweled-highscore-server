"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite = require('sqlite3');
class Highscores {
    constructor() {
        this.list = [];
    }
    loadData() {
        return new Promise(function (resolve, reject) {
            let db = new sqlite.Database('./scores.sqlite');
            db.all('SELECT name,score FROM Scores ORDER BY score DESC', [], (error, result) => {
                resolve(result);
            });
            db.close();
        });
    }
    async load() {
        await this.loadData().then(result => {
            this.list = result;
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
//# sourceMappingURL=Highscores.js.map