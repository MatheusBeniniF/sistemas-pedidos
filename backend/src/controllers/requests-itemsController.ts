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
    const { request_id, product_id, quantity } = requestSchema.parse(request.body);

    const requestsItemService = new RequestsItemService();
    const productService = new ProductService();
    
    const product = await productService.findById(product_id);

    if (!product) {
      return reply.status(404).send({ error: "Produto não encontrado" });
    }

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
      return reply.status(400).send({ error: error.errors.map((err) => err.message) });
    }
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message });
    }
    console.error("Erro ao criar pedido:", error);
    return reply.status(500).send({ error: "Erro ao criar pedido" });
  }
}

export async function getRequestsItemByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: number };
    const requestService = new RequestsItemService();
    const foundRequest = await requestService.findById(id);

    return reply.send(foundRequest);
  } catch (error) {
    return reply.status(500).send({ error: "Erro ao buscar pedido" });
  }
}

export async function deleteRequestItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: number };
    const requestService = new RequestsItemService();
    const deletedRequest = await requestService.delete(id);

    return reply.send({
      message: "Pedido deletado com sucesso!",
      deletedRequest,
    });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: "Erro ao deletar pedido" });
  }
}

export async function updateRequestItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: number };
    const { request_id, product_id, quantity } = requestSchema.parse(request.body);
    const requestService = new RequestsItemService();
    const updatedRequest = await requestService.update(id, request_id, product_id, quantity);

    return reply.send({
      message: "Pedido atualizado com sucesso!",
      updatedRequest,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors.map((err) => err.message) });
    }
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: "Erro ao atualizar pedido" });
  }
}
