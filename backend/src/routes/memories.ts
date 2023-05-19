import { FastifyInstance } from "fastify";
import { z } from "zod";

import prisma from "../lib/prisma";

// eslint-disable-next-line
export async function memoriesRoutes(app: FastifyInstance) {
  app.get("/memories", async () => {
    const memories = await prisma.memory.findMany({ orderBy: { createdAt: "asc" } });
    return memories.map(memory => ({
      id: memory.id,
      coverUrl: memory.coverUrl,
      except: memory.content.substring(0, 115).concat("..."),
    }));
  });

  app.get("/memories/:id", async request => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    return prisma.memory.findUniqueOrThrow({
      where: { id },
    });
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
        userId: "570a74f5-2d60-4136-88b7-c5481c726a04",
      },
    });
  });

  app.put("/memories/:id", async request => {
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

    return prisma.memory.update({
      where: { id },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    });
  });

  app.delete("/memories/:id", async request => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    return prisma.memory.delete({
      where: { id },
    });
  });
}
