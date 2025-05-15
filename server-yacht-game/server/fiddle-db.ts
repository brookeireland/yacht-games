import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("fiddle.sqlite");
//todo add highscore to user table
db.exec("CREATE TABLE IF NOT EXISTS user(name TEXT, UNIQUE(name))");
let stmt = db.prepare(`SELECT name FROM user WHERE rowid = ?`);
// const stmt = db.prepare("UPDATE username SET name = ? WHERE id = 0");
const row = stmt.get(2);
console.log({ row });

stmt = db.prepare("INSERT OR IGNORE INTO user(name) VALUES(?)");
console.log(stmt.run("greg"));
stmt = db.prepare("SELECT rowid, * FROM user");
console.log(stmt.all());
