import { FastifyReply, FastifyRequest } from "fastify";
import { ClientsService } from "../services/clientsService";
import { z } from "zod";

const clientSchema = z.object({
    name: z
        .string()
        .min(1, "Nome é obrigatório")
        .trim(),
    email: z
        .string()
        .min(1, "Email é obrigatório")
        .email("Email inválido")
        .trim()
});

export async function getAllClientsController(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const clientService = new ClientsService();
    const clients = await clientService.getAllClients();
    
    return reply.send(clients);
  } catch (error) {
    return reply.status(500).send({ error: "Erro ao buscar clientes" });
  }
}

export async function createClientController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { name, email } = clientSchema.parse(request.body as { name: string; email: string });
    const clientService = new ClientsService();
    const client = await clientService.register({ name, email });
    
    return reply.send({ message: "Cliente criado com sucesso!", client });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: error.errors.map((err) => err.message) });
    }
    return reply.status(500).send({ error: "Erro ao criar cliente" });
  }
}