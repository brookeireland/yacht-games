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
  const stmt = db.prepare(
    `SELECT EXISTS(SELECT 1 FROM user WHERE name = ?) AS foo`
  );
  // const stmt = db.prepare("UPDATE username SET name = ? WHERE id = 0");
  const row = stmt.get((request.body as any).username);
  console.log({ row });
  reply.send({});
});

// Run the server!
server.listen({ port: 3000 }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
