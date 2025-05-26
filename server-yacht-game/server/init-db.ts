import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("db.sqlite");
//todo add highscore to user table
db.exec(`CREATE TABLE IF NOT EXISTS user(
    rowid INTEGER PRIMARY KEY,
    name TEXT,
    top_score INTEGER,
    UNIQUE(name) 
    )`);
db.exec(
  `CREATE TABLE IF NOT EXISTS game(
        rowid INTEGER PRIMARY KEY,
        userid INTEGER, 
        data JSONB, 
        FOREIGN KEY(userid) REFERENCES user(rowid)
  )`
);
console.log("Complete!");
