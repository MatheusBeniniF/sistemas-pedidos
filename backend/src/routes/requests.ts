import { FastifyInstance } from "fastify";
import {
  createRequestController,
  deleteRequestController,
  getAllRequestsController,
  getRequestByIdController,
  updateRequestController,
} from "../controllers/requestController";

export function requestsRoutes(app: FastifyInstance) {
  app.get("/requests/:id", getRequestByIdController);

  app.get("/requests", getAllRequestsController);

  app.post("/requests", createRequestController);

  app.put("/requests/:id", updateRequestController);

  app.delete("/requests/:id", deleteRequestController);
}
