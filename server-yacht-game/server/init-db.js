const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("db.sqlite");
db.exec("CREATE TABLE username(id INTEGER PRIMARY KEY, name TEXT)");
db.exec(`INSERT INTO username VALUES(0, '')`);
