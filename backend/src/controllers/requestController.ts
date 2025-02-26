import { FastifyReply, FastifyRequest } from "fastify";
import { RequestService } from "../services/requestsService";
import { z } from "zod";

const requestSchema = z.object({
  client_id: z.number().min(1, "Id do cliente é obrigatório"),
});

export async function getAllRequestsController(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const requestService = new RequestService();
    const requests = await requestService.getAllProducts();

    return reply.send(requests);
  } catch (error) {
    return reply.status(500).send({ error: "Erro ao buscar produtos" });
  }
}

export async function createRequestController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { client_id } = requestSchema.parse(request.body);
    const requestService = new RequestService();
    const createdRequest = await requestService.create(client_id);

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

export async function getRequestByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: number };
    const requestService = new RequestService();
    const foundRequest = await requestService.findById(id);

    return reply.send(foundRequest);
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: "Erro ao buscar pedido" });
  }
}

export async function updateRequestController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: number };
    const { client_id } = requestSchema.parse(request.body);
    const requestService = new RequestService();
    const updatedRequest = await requestService.update(id, client_id);

    return reply.send({
      message: "Pedido atualizado com sucesso!",
      updatedRequest,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ error: error.errors.map((err) => err.message) });
    }
    if (error instanceof Error) {
      return reply.status(400).send({ error: error.message });
    }
    return reply.status(500).send({ error: "Erro ao atualizar pedido" });
  }
}

export async function deleteRequestController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: number };
    const requestService = new RequestService();
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
