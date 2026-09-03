import Fastify from "fastify";
import { db } from "./db/client";
import { users } from "./db/schema/users";
// import { db } from "./db/client";
// import { sql } from "drizzle-orm";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.get("/health", async () => {
    return {
      status: "ok",
    };
  });

  // app.get("/health/db", async () => {
  //   const result = await db.execute(sql`select 1`);
  //   return {
  //     status: "ok",
  //     database: result,
  //   };
  // });

  app.get("/users", async () => {
    const result = await db.select().from(users);

    return {
      users: result,
    };
  });

  app.post("/users", async (request, reply) => {
    const body = request.body as {
      email: string;
      name: string;
    };

    const [user] = await db
      .insert(users)
      .values({
        email: body.email,
        name: body.name,
      })
      .returning();

    return reply.code(201).send({
      user,
    });
  });
  return app;
}
