"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = __importDefault(require("fastify"));
const products_1 = require("./routes/products");
const clients_1 = require("./routes/clients");
const requests_1 = require("./routes/requests");
const requests_items_1 = require("./routes/requests-items");
const app = (0, fastify_1.default)();
app.register(cors_1.default, {
    origin: "*",
});
app.get("/", () => {
    return "servidor ok";
});
app.register(products_1.productsRoutes);
app.register(clients_1.clientsRoutes);
app.register(requests_1.requestsRoutes);
app.register(requests_items_1.requestsItemsRoutes);
app.listen({ port: 3000 }).then(() => {
    console.log("Servidor rodando em http://localhost:3000");
});
