import { FastifyInstance } from "fastify";
import { createRequestController, getAllRequestsController } from "../controllers/requestController";

export function requestsRoutes(app: FastifyInstance) {
    app.get("/requests", getAllRequestsController);

    app.post("/requests", createRequestController);
}