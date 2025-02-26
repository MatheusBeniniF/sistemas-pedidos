"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsRoutes = clientsRoutes;
const clientsController_1 = require("../controllers/clientsController");
function clientsRoutes(app) {
    app.get("/clients/:id", clientsController_1.getClientByIdController);
    app.get("/clients", clientsController_1.getAllClientsController);
    app.post("/clients", clientsController_1.createClientController);
    app.put("/clients/:id", clientsController_1.updateClientController);
    app.delete("/clients/:id", clientsController_1.deleteClientController);
}
