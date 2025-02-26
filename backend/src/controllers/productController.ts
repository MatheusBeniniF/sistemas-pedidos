import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ProductService } from "../services/productService";

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .trim(),
  price: z
    .preprocess((val) => Number(val), z.number().positive("Preço deve ser um número positivo"))
});
export async function createProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { name, price } = productSchema.parse(request.body);
    const productService = new ProductService();
    
    const product = await productService.register(name, price);

    return reply.send({ message: "Produto criado com sucesso!", product });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors.map((err) => err.message) });
    }
    console.error("Error creating product: ", error);
    return reply.status(500).send({ error: "Erro ao criar produto" });
  }
}

export async function getAllProductsController(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const productService = new ProductService();
    const products = await productService.getAllProducts();
    return reply.send(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    return reply.status(500).send({ error: "Erro ao buscar produtos" });
  }
  
}
