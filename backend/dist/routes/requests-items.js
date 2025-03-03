"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsItemsRoutes = requestsItemsRoutes;
const requests_itemsController_1 = require("../controllers/requests-itemsController");
function requestsItemsRoutes(app) {
    app.get("/requests-items/:id", requests_itemsController_1.getRequestsItemByIdController);
    app.get("/requests-items", requests_itemsController_1.getAllRequestsItemController);
    app.post("/requests-items", requests_itemsController_1.createRequestItemController);
    app.put("/requests-items/:id", requests_itemsController_1.updateRequestItemController);
    app.delete("/requests-items/:id", requests_itemsController_1.deleteRequestItemController);
}
