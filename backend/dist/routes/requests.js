"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsRoutes = requestsRoutes;
const requestController_1 = require("../controllers/requestController");
function requestsRoutes(app) {
    app.get("/requests/:id", requestController_1.getRequestByIdController);
    app.get("/requests", requestController_1.getAllRequestsController);
    app.post("/requests", requestController_1.createRequestController);
    app.put("/requests/:id", requestController_1.updateRequestController);
    app.delete("/requests/:id", requestController_1.deleteRequestController);
}
