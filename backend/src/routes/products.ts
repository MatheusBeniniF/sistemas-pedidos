import { FastifyInstance } from "fastify";
import { createProductController, getAllProductsController } from "../controllers/productController";

export async function productsRoutes(app: FastifyInstance) {
  app.get("/produtos", getAllProductsController);

  app.post("/produtos", createProductController);
}
