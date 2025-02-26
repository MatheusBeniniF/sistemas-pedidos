"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRequestsController = getAllRequestsController;
exports.createRequestController = createRequestController;
const requestsService_1 = require("../services/requestsService");
const zod_1 = require("zod");
const requestSchema = zod_1.z.object({
    client_id: zod_1.z.number().min(1, "Id do cliente é obrigatório"),
});
function getAllRequestsController(_request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requestService = new requestsService_1.RequestService();
            const requests = yield requestService.getAllProducts();
            return reply.send(requests);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar produtos" });
        }
    });
}
function createRequestController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { client_id } = requestSchema.parse(request.body);
            const requestService = new requestsService_1.RequestService();
            const createdRequest = yield requestService.create(Number(client_id));
            return reply.send({
                message: "Pedido criado com sucesso!",
                createdRequest,
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({ error: error.errors.map((err) => err.message) });
            }
            return reply.status(500).send({ error: "Erro ao criar pedido" });
        }
    });
}
