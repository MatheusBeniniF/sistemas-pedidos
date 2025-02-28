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
exports.getAllRequestsItemController = getAllRequestsItemController;
exports.createRequestItemController = createRequestItemController;
exports.getRequestsItemByIdController = getRequestsItemByIdController;
exports.deleteRequestItemController = deleteRequestItemController;
exports.updateRequestItemController = updateRequestItemController;
const requests_itemService_1 = require("../services/requests-itemService");
const zod_1 = require("zod");
const productService_1 = require("../services/productService");
const requestSchema = zod_1.z.object({
    request_id: zod_1.z.number().min(1, "Id do pedido é obrigatório"),
    product_id: zod_1.z.number().min(1, "Id do produto é obrigatório"),
    quantity: zod_1.z.number().min(1, "Quantidade é obrigatória"),
});
function getAllRequestsItemController(_request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requestService = new requests_itemService_1.RequestsItemService();
            const requests = yield requestService.getAllRequestsItem();
            return reply.send(requests);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar produtos" });
        }
    });
}
function createRequestItemController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { request_id, product_id, quantity } = requestSchema.parse(request.body);
            const requestsItemService = new requests_itemService_1.RequestsItemService();
            const productService = new productService_1.ProductService();
            const product = yield productService.findById(product_id);
            if (!product) {
                return reply.status(404).send({ error: "Produto não encontrado" });
            }
            const createdRequest = yield requestsItemService.create(request_id, product_id, quantity, product.price);
            return reply.send({
                message: "Pedido criado com sucesso!",
                createdRequest,
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({ error: error.errors.map((err) => err.message) });
            }
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            console.error("Erro ao criar pedido:", error);
            return reply.status(500).send({ error: "Erro ao criar pedido" });
        }
    });
}
function getRequestsItemByIdController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const requestService = new requests_itemService_1.RequestsItemService();
            const foundRequest = yield requestService.findById(id);
            return reply.send(foundRequest);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar pedido" });
        }
    });
}
function deleteRequestItemController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const requestService = new requests_itemService_1.RequestsItemService();
            const deletedRequest = yield requestService.delete(id);
            return reply.send({
                message: "Pedido deletado com sucesso!",
                deletedRequest,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: "Erro ao deletar pedido" });
        }
    });
}
function updateRequestItemController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const { request_id, product_id, quantity } = requestSchema.parse(request.body);
            const requestService = new requests_itemService_1.RequestsItemService();
            const updatedRequest = yield requestService.update(id, {
                id,
                request_id,
                product_id,
                quantity,
            });
            return reply.send({
                message: "Pedido atualizado com sucesso!",
                updatedRequest,
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({ error: error.errors.map((err) => err.message) });
            }
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: "Erro ao atualizar pedido" });
        }
    });
}
