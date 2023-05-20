import { FastifyInstance } from "fastify";
import { z } from "zod";

import prisma from "../lib/prisma";

// eslint-disable-next-line
export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async request => request.jwtVerify());

  app.get("/memories", async request => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: { createdAt: "asc" },
    });

    return memories.map(memory => ({
      id: memory.id,
      coverUrl: memory.coverUrl,
      except: memory.content.substring(0, 115).concat("..."),
    }));
  });

  app.get("/memories/:id", async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return response.status(401).send();
    }

    return memory;
  });

  app.post("/memories", async request => {
    const bodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    });

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body);

    return prisma.memory.create({
      data: {
        content,
        isPublic,
        coverUrl,
        userId: request.user.sub,
      },
    });
  });

  app.put("/memories/:id", async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    });

    const { id } = paramsSchema.parse(request.params);
    const { content, isPublic, coverUrl } = bodySchema.parse(request.body);

    let memory = await prisma.memory.findUniqueOrThrow({ where: { id } });

    if (memory.userId !== request.user.sub) {
      response.status(401).send();
    }

    memory = await prisma.memory.update({
      where: { id },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    });

    return memory;
  });

  app.delete("/memories/:id", async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({ where: { id } });

    if (memory.userId !== request.user.sub) {
      response.status(401).send();
    }

    return prisma.memory.delete({
      where: { id },
    });
  });
}
