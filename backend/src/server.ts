import "dotenv/config";
import { resolve } from "path";
import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import fstatic from "@fastify/static";

import { uploadRoutes } from "./routes/upload";
import { authRoutes } from "./routes/auth";
import { memoriesRoutes } from "./routes/memories";

const app = fastify();

app.register(multipart);
app.register(fstatic, {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads/",
});
app.register(cors, {
  origin: true,
});
app.register(jwt, {
  secret: process.env.JWT_SECRET || "defaultsecret",
});

app.register(uploadRoutes);
app.register(authRoutes);
app.register(memoriesRoutes);

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => console.info(`Server running on http://localhost:3333`));
