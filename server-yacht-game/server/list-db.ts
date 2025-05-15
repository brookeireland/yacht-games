import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("db.sqlite");
const stmt = db.prepare("SELECT rowid, * FROM user");
console.table(stmt.all());
