import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { productsRoutes } from "./routes/products";

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: "*",
});

fastify.register(productsRoutes);

fastify.get("/", async (_request, _reply) => {
  return { message: "API de Pedidos de Vendas funcionando com TypeScript!" };
});

fastify.listen({ port: Number(process.env.API_PORT) || 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em http://localhost:${process.env.API_PORT} ${address}`);
});
