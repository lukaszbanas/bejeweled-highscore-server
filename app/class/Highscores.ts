import {Score} from "../types/Score";
const sqlite = require('sqlite3');

export class Highscores {
    public list: Array<Score>;

    public constructor() {
        this.list = []
    }

    protected loadData () {
        return new Promise(function(resolve, reject) {
            let db = new sqlite.Database('./scores.sqlite');
            // @ts-ignore
            db.all('SELECT name,score FROM Scores ORDER BY score DESC', [], (error, result) => {
                resolve(result);
            });
            db.close()
        });
    }

    public async load () {
        await this.loadData().then(result => {
            // @ts-ignore
            this.list = result;
        });
    }

    public add (entry: Score) {
        let db = new sqlite.Database('./scores.sqlite');
        db.run('INSERT INTO Scores(`name`, `score`) VALUES (?, ?)', [entry.name, entry.score]);
        db.close();
    }

    public get () {
        this.load();

        return this.toString()
    }

    public toString () {
        return JSON.stringify(this.list);
    }
}
