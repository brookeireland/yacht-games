import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("fiddle.sqlite");
//todo add highscore to user table
db.exec(`CREATE TABLE IF NOT EXISTS user(
    rowid INTEGER PRIMARY KEY,
    name TEXT, 
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

let stmt = db.prepare(`SELECT name FROM user WHERE rowid = ?`);
// const stmt = db.prepare("UPDATE username SET name = ? WHERE id = 0");
const row = stmt.get(2);
console.log({ row });

stmt = db.prepare("INSERT OR IGNORE INTO user(name) VALUES(?)");
console.log(stmt.run("greg"));

stmt = db.prepare("SELECT rowid, * FROM user");
console.log(stmt.all());

stmt = db.prepare("INSERT OR IGNORE INTO game(userid, data) VALUES(?,?)");
console.log(stmt.run(1, JSON.stringify({ a: 1, b: ["hello"] })));
stmt = db.prepare("SELECT rowid, * FROM game");
console.log(stmt.all());
