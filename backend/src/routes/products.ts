import { FastifyInstance } from "fastify";
import { createProductController, getAllProductsController } from "../controllers/productController";

export async function productsRoutes(app: FastifyInstance) {
  app.get("/products", getAllProductsController);

  app.post("/products", createProductController);
}
