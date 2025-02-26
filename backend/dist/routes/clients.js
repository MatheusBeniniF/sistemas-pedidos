"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsRoutes = clientsRoutes;
const clientsController_1 = require("../controllers/clientsController");
function clientsRoutes(app) {
    app.get("/clientes", clientsController_1.getAllClientsController);
    app.post("/clientes", clientsController_1.createClientController);
}
