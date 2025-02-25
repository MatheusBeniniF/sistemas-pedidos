import { FastifyRequest, FastifyReply } from "fastify";
import { productService } from "../services/productService";
import { z } from "zod";

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .trim()
    .refine((val) => val !== "", {
      message: "Nome não pode ser vazio",
    }),
  price: z
    .preprocess((val) => Number(val), z.number().positive("Preço deve ser um número positivo"))
    .refine((val) => val >= 0, { message: "Preço não pode ser negativo" }),
});

export async function createProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { name, price } = productSchema.parse(request.body);

    await productService.createProduct(name, price);

    return reply.send({ message: "Produto criado com sucesso!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors.map((err) => err.message) });
    }
    console.error("Error creating product: ", error);
    return reply.status(500).send({ error: "Erro ao criar produto" });
  }
}

export async function getAllProductsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products = await productService.getAllProducts();
    return reply.send(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    return reply.status(500).send({ error: "Erro ao buscar produtos" });
  }
}
