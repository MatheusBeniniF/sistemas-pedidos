import { FastifyReply, FastifyRequest } from "fastify";
import { RequestsItemService } from "../services/requests-itemService";
import { z } from "zod";
import { ProductService } from "../services/productService";

const requestSchema = z.object({
  request_id: z.number().min(1, "Id do pedido é obrigatório"),
  product_id: z.number().min(1, "Id do produto é obrigatório"),
  quantity: z.number().min(1, "Quantidade é obrigatória"),
});

export async function getAllRequestsItemController(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const requestService = new RequestsItemService();
    const requests = await requestService.getAllRequestsItem();
    return reply.send(requests);
  } catch (error) {
    return reply.status(500).send({ error: "Erro ao buscar produtos" });
  }
}

export async function createRequestItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { request_id, product_id, quantity } = requestSchema.parse(
      request.body
    );
    const requestsItemService = new RequestsItemService();
    const productService = new ProductService();
    const product = await productService.findById(product_id);

    const createdRequest = await requestsItemService.create(
      request_id,
      product_id,
      quantity,
      product.price
    );
    return reply.send({
      message: "Pedido criado com sucesso!",
      createdRequest,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ error: error.errors.map((err) => err.message) });
    }
    return reply.status(500).send({ error: "Erro ao criar pedido" });
  }
}
