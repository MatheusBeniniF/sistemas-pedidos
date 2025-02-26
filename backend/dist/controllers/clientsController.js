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
exports.getAllClientsController = getAllClientsController;
exports.createClientController = createClientController;
exports.updateClientController = updateClientController;
exports.deleteClientController = deleteClientController;
exports.getClientByIdController = getClientByIdController;
const clientsService_1 = require("../services/clientsService");
const zod_1 = require("zod");
const clientSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Nome é obrigatório")
        .trim(),
    email: zod_1.z
        .string()
        .min(1, "Email é obrigatório")
        .email("Email inválido")
        .trim()
});
function getAllClientsController(_request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const clientService = new clientsService_1.ClientsService();
            const clients = yield clientService.getAllClients();
            return reply.send(clients);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar clientes" });
        }
    });
}
function createClientController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email } = clientSchema.parse(request.body);
            const clientService = new clientsService_1.ClientsService();
            const client = yield clientService.register({ name, email });
            return reply.send({ message: "Cliente criado com sucesso!", client });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({ error: error.errors.map((err) => err.message) });
            }
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: "Erro ao criar cliente" });
        }
    });
}
function updateClientController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const { name, email } = clientSchema.parse(request.body);
            const clientService = new clientsService_1.ClientsService();
            const client = yield clientService.update(id, { name, email });
            return reply.send({ message: "Cliente atualizado com sucesso!", client });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({ error: error.errors.map((err) => err.message) });
            }
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: "Erro ao atualizar cliente" });
        }
    });
}
function deleteClientController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const clientService = new clientsService_1.ClientsService();
            const client = yield clientService.delete(id);
            return reply.send({ message: "Cliente deletado com sucesso!", client });
        }
        catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: "Erro ao deletar cliente" });
        }
    });
}
function getClientByIdController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const clientService = new clientsService_1.ClientsService();
            const client = yield clientService.findById(id);
            return reply.send(client);
        }
        catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: "Erro ao buscar cliente" });
        }
    });
}
