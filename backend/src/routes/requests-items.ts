import { FastifyInstance } from "fastify";
import {
  createRequestItemController,
  deleteRequestItemController,
  getAllRequestsItemController,
  getRequestsItemByIdController,
  updateRequestItemController,
} from "../controllers/requests-itemsController";

export function requestsItemsRoutes(app: FastifyInstance) {
  app.get("/requests-items/:id", getRequestsItemByIdController);

  app.get("/requests-items", getAllRequestsItemController);

  app.post("/requests-items", createRequestItemController);

  app.put("/requests-items/:id", updateRequestItemController);

  app.delete("/requests-items/:id", deleteRequestItemController);
}
