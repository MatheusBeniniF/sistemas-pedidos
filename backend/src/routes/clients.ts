import { FastifyInstance } from "fastify";
import { createClientController, getAllClientsController } from "../controllers/clientsController";

export function clientsRoutes(app: FastifyInstance) {
  app.get("/clientes", getAllClientsController);

  app.post("/clientes", createClientController);
}
