import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { productsRoutes } from "./routes/products";

const app = fastify();
app.register(fastifyCors, {
  origin: "*"
})
app.get("/", () => {
  return 'servidor ok'
})
app.register(productsRoutes);

app.listen({ port: 3000 }).then(() => {
  console.log("Servidor rodando em http://localhost:3000");
});