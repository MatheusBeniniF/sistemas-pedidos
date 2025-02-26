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
exports.productsRoutes = productsRoutes;
const productController_1 = require("../controllers/productController");
function productsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/products/:id", productController_1.getProductsByIdController);
        app.get("/products", productController_1.getAllProductsController);
        app.post("/products", productController_1.createProductController);
        app.put("/products/:id", productController_1.updateProductController);
        app.delete("/products/:id", productController_1.deleteProductController);
    });
}
