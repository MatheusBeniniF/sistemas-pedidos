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
exports.RequestsItemService = void 0;
const database_1 = require("../database");
class RequestsItemService {
    getAllRequestsItem() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM requests_item");
                return {
                    requests_item: rows
                };
            }
            catch (error) {
                throw new Error("Erro ao buscar produtos");
            }
            finally {
                connection.end();
            }
        });
    }
    create(request_id, product_id, quantity, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("INSERT INTO requests_item (request_id, product_id, quantity, price) VALUES (?, ?, ?, ?)", [request_id, product_id, quantity, price]);
                return {
                    id: rows.insertId,
                    request_id,
                    product_id,
                    quantity,
                    price
                };
            }
            catch (error) {
                throw new Error("Erro ao criar item do pedido");
            }
            finally {
                connection.end();
            }
        });
    }
}
exports.RequestsItemService = RequestsItemService;
