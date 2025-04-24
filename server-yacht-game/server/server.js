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

// Declare a route
fastify.get("/api/hello", function handler(request, reply) {
  reply.send({ hello: "world2" });
});
let username = "";
fastify.post("/api/username", function handler(request, reply) {
  username = request.body.username;
  reply.send({});
});
//curl http://localhost:3000/api/username -XPOST -H "content-type: application/json" -d "{\"username\": \"123\"}"

fastify.get("/api/username", function handler(request, reply) {
  reply.send({ username: username });
});

// Run the server!
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
