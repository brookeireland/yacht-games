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

server.post("/api/set-username", function handler(request, reply) {
  const stmt = db.prepare("UPDATE username SET name = ? WHERE id = 0");
  stmt.run((request.body as any).username);
  reply.send({});
});

server.post("/api/get-username", function handler(request, reply) {
  const stmt = db.prepare("SELECT name FROM username WHERE id = 0");
  const row = stmt.get() as any;
  reply.send({ username: row.name });
});

// Run the server!
server.listen({ port: 3000 }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
