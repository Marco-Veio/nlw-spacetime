import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const app = fastify();
const prisma = new PrismaClient();

app.get("/users", async () => prisma.user.findMany());

app.listen({ port: 3333 }).then(() => console.info(`Server running on http://localhost:3333`));
