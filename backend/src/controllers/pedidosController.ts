import { FastifyReply, FastifyRequest } from "fastify";
import { RequestService } from "../services/requestsService";

export async function getAllRequestsController(
    _request: FastifyRequest,
    reply: FastifyReply) {
    try {
        const requestService = new RequestService();
        const requests = await requestService.getAllProducts();
        return reply.send(requests);
    } catch (error) {
        return reply.status(500).send({ error: "Erro ao buscar produtos" });
    }
    
}