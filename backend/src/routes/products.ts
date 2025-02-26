import { FastifyInstance } from "fastify";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductsByIdController,
  updateProductController,
} from "../controllers/productController";

export async function productsRoutes(app: FastifyInstance) {
  app.get("/products/:id", getProductsByIdController);

  app.get("/products", getAllProductsController);

  app.post("/products", createProductController);

  app.put("/products/:id", updateProductController);

  app.delete("/products/:id", deleteProductController);
}
