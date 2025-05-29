import { DatabaseSync } from "node:sqlite";
import { rmSync } from "node:fs";
rmSync("db.sqlite", { force: true });
const db = new DatabaseSync("db.sqlite");
//todo add highscore to user table

db.exec(`CREATE TABLE IF NOT EXISTS user(
    rowid INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    top_score INTEGER,
    UNIQUE(name) 
    )`);
db.exec(
  `CREATE TABLE IF NOT EXISTS game(
        rowid INTEGER PRIMARY KEY,
        userid INTEGER NOT NULL, 
        data JSONB NOT NULL, 
        FOREIGN KEY(userid) REFERENCES user(rowid)
  )`
);
console.log("Complete!");
