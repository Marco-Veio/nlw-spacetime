import { randomUUID } from "crypto";
import { extname, resolve } from "path";
import { createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

import { FastifyInstance } from "fastify";

const pump = promisify(pipeline);

// eslint-disable-next-line
export async function uploadRoutes(app: FastifyInstance) {
  app.post("/upload", async (request, response) => {
    const upload = await request.file({
      limits: {
        fileSize: 5242880, // 5MB
      },
    });

    if (!upload) {
      return response.status(400).send();
    }

    if (!/^(image|video)\/[a-zA-Z]*/.test(upload.mimetype)) {
      return response.status(400).send();
    }

    const fileId = randomUUID();
    const extension = extname(upload.filename);

    const filename = fileId.concat(extension);

    const writeStream = createWriteStream(resolve(__dirname, "../../uploads/", filename));

    await pump(upload.file, writeStream);

    const url = request.protocol.concat("://").concat(request.hostname);
    const fileUrl = new URL(`/uploads/${filename}`, url).toString();

    return { fileUrl };
  });
}
