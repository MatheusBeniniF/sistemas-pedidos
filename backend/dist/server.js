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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = require("./routes/products");
dotenv_1.default.config();
const fastify = (0, fastify_1.default)({ logger: true });
fastify.register(cors_1.default, {
    origin: "*",
});
fastify.register(products_1.productsRoutes);
fastify.get("/", (_request, _reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { message: "API de Pedidos de Vendas funcionando com TypeScript!" };
}));
fastify.listen({ port: Number(process.env.API_PORT) || 3000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em http://localhost:${process.env.API_PORT} ${address}`);
});
