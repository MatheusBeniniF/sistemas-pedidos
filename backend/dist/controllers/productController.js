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
const productService_1 = require("../services/productService");
const zod_1 = require("zod");
const productSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Nome é obrigatório")
        .trim()
        .refine((val) => val !== "", {
        message: "Nome não pode ser vazio",
    }),
    price: zod_1.z
        .preprocess((val) => Number(val), zod_1.z.number().positive("Preço deve ser um número positivo"))
        .refine((val) => val >= 0, { message: "Preço não pode ser negativo" }),
});
function createProductController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, price } = productSchema.parse(request.body);
            yield productService_1.productService.createProduct(name, price);
            return reply.send({ message: "Produto criado com sucesso!" });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({ error: error.errors.map((err) => err.message) });
            }
            console.error("Error creating product: ", error);
            return reply.status(500).send({ error: "Erro ao criar produto" });
        }
    });
}
function getAllProductsController(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield productService_1.productService.getAllProducts();
            return reply.send(products);
        }
        catch (error) {
            console.error("Error fetching products: ", error);
            return reply.status(500).send({ error: "Erro ao buscar produtos" });
        }
    });
}
