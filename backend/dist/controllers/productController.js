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
exports.createProductController = createProductController;
exports.getAllProductsController = getAllProductsController;
exports.deleteProductController = deleteProductController;
exports.updateProductController = updateProductController;
exports.getProductsByIdController = getProductsByIdController;
const zod_1 = require("zod");
const productService_1 = require("../services/productService");
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório").trim(),
    price: zod_1.z.preprocess((val) => Number(val), zod_1.z.number().positive("Preço deve ser um número positivo")),
});
function createProductController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, price } = productSchema.parse(request.body);
            const productService = new productService_1.ProductService();
            const product = yield productService.register(name, price);
            return reply.send({ message: "Produto criado com sucesso!", product });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply
                    .status(400)
                    .send({ error: error.errors.map((err) => err.message) });
            }
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: "Erro ao criar produto" });
        }
    });
}
function getAllProductsController(_request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productService = new productService_1.ProductService();
            const products = yield productService.getAllProducts();
            return reply.send(products);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar produtos" });
        }
    });
}
function deleteProductController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const productService = new productService_1.ProductService();
            const product = yield productService.delete(id);
            return reply.send({ message: "Produto deletado com sucesso!", product });
        }
        catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: "Erro ao deletar produto" });
        }
    });
}
function updateProductController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const { name, price } = productSchema.parse(request.body);
            const productService = new productService_1.ProductService();
            const product = yield productService.update(id, { name, price });
            return reply.send({ message: "Produto atualizado com sucesso!", product });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({ error: error.errors.map((err) => err.message) });
            }
            if (error instanceof Error) {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({ error: "Erro ao atualizar produto" });
        }
    });
}
function getProductsByIdController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const productService = new productService_1.ProductService();
            const product = yield productService.findById(id);
            return reply.send(product);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar produto" });
        }
    });
}
