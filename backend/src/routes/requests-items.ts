import { FastifyInstance } from "fastify";
import {
  createRequestItemController,
  getAllRequestsItemController,
} from "../controllers/requests-itemsController";

export function requestsItemsRoutes(app: FastifyInstance) {
  app.get("/requests-items", getAllRequestsItemController);

  app.post("/requests-items", createRequestItemController);
}
