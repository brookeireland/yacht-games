import { DatabaseSync } from "node:sqlite";
import fastify from "fastify";
const db = new DatabaseSync("db.sqlite");

// Require the framework and instantiate it
const server = fastify({
  logger: {
    level: "warn",
    transport: {
      target: "pino-pretty",
      options: {
        ignore: "pid,hostname",
      },
    },
  },
});

// server.post("/api/get-username", function handler(request, reply) {
//   const stmt = db.prepare("SELECT name FROM username WHERE id = 0");
//   const row = stmt.get() as any;
//   reply.send({ username: row.name });
// });

server.post("/api/login", function handler(request, reply) {
  let stmt = db.prepare(`SELECT rowid, top_score FROM user WHERE name = ?`);
  const username = (request.body as any).username;
  const row = stmt.get(username);
  if (row) {
    return { id: row.rowid, score: row.top_score };
  }
  stmt = db.prepare("INSERT OR IGNORE INTO user(name) VALUES(?)");
  const result = stmt.run(username);
  if (result.changes) {
    return { id: result.lastInsertRowid, score: 0 };
  }
  throw new Error("Failed to exist and insert?", { cause: username });
});

server.post("/api/top-score", function handler(request, reply) {
  const score = (request.body as any).score;
  const username = (request.body as any).username;
  const stmt = db.prepare(`UPDATE user SET top_score = ? WHERE name = ?`);
  const result = stmt.run(score, username);
  if (result.changes) {
    return;
  }
  throw new Error("Failed to insert top score", { cause: score });
});

// Run the server!
server.listen({ port: 3000 }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
