const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("db.sqlite");

// Require the framework and instantiate it
const fastify = require("fastify")({
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

fastify.post("/api/set-username", function handler(request, reply) {
  const stmt = db.prepare("UPDATE username SET name = ? WHERE id = 0");
  stmt.run(request.body.username);
  reply.send({});
});

fastify.post("/api/get-username", function handler(request, reply) {
  const stmt = db.prepare("SELECT name FROM username WHERE id = 0");
  const row = stmt.get();
  reply.send({ username: row.name });
});

// Run the server!
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
