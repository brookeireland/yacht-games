import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("db.sqlite");
//todo add highscore to user table
db.exec("CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY, name TEXT)");
console.log("Complete!");
