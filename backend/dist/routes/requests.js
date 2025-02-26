"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsRoutes = requestsRoutes;
const requestController_1 = require("../controllers/requestController");
function requestsRoutes(app) {
    app.get("/requests", requestController_1.getAllRequestsController);
    app.post("/requests", requestController_1.createRequestController);
}
