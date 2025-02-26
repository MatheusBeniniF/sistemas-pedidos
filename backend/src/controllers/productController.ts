import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ProductService } from "../services/productService";

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").trim(),
  price: z.preprocess(
    (val) => Number(val),
    z.number().positive("Preço deve ser um número positivo")
  ),
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
      return reply
        .status(400)
        .send({ error: error.errors.map((err) => err.message) });
    }
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message });
    }
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
    return reply.status(500).send({ error: "Erro ao buscar produtos" });
  }
}

export async function deleteProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: number };
    const productService = new ProductService();
    const product = await productService.delete(id);
    return reply.send({ message: "Produto deletado com sucesso!", product });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: "Erro ao deletar produto" });
  }
}

export async function updateProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: number };
    const { name, price } = productSchema.parse(request.body as { name: string; price: number });
    const productService = new ProductService();
    const product = await productService.update(id, { name, price });
    return reply.send({ message: "Produto atualizado com sucesso!", product });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors.map((err) => err.message) });
    }
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: "Erro ao atualizar produto" });
  }
}

export async function getProductsByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: number };
    const productService = new ProductService();
    const product = await productService.findById(id);
    return reply.send(product);
  } catch (error) {
    return reply.status(500).send({ error: "Erro ao buscar produto" });
  }
}