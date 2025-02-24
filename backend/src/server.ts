import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import pool from "./database";

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(cors);

fastify.get("/", async (_request, _reply) => {
  return { message: "API de Pedidos de Vendas funcionando com TypeScript!" };
});

const start = async () => {
  try {
    await fastify.listen({
      port: Number(process.env.API_PORT) || 3000,
      host: "0.0.0.0",
    });
    console.log(`Servidor rodando em http://localhost:${process.env.API_PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
