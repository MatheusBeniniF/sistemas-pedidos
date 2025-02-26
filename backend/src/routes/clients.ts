import { FastifyInstance } from "fastify";
import {
  createClientController,
  deleteClientController,
  getAllClientsController,
  getClientByIdController,
  updateClientController,
} from "../controllers/clientsController";

export function clientsRoutes(app: FastifyInstance) {
  app.get("/clients/:id", getClientByIdController);

  app.get("/clients", getAllClientsController);

  app.post("/clients", createClientController);

  app.put("/clients/:id", updateClientController);

  app.delete("/clients/:id", deleteClientController);
}
