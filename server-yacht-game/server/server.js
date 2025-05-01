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

let username = "";
fastify.post("/api/set-username", function handler(request, reply) {
  username = request.body.username;
  reply.send({});
});

fastify.post("/api/get-username", function handler(request, reply) {
  reply.send({ username: username });
});

// Run the server!
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
