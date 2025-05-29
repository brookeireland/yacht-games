import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("db.sqlite");
let stmt = db.prepare("SELECT * FROM user");
console.log("User Table");
console.table(stmt.all());
console.log("Game Table");
stmt = db.prepare("SELECT * FROM game");
console.table(stmt.all());
