import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("db.sqlite");
let stmt = db.prepare("SELECT * FROM user");
console.table(stmt.all());
stmt = db.prepare("SELECT * FROM game");
console.table(stmt.all());
