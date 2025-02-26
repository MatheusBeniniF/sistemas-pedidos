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
                    requests_item: rows,
                };
            }
            catch (error) {
                console.error("Erro ao buscar itens do pedido:", error);
                throw new Error("Erro ao buscar itens do pedido");
            }
            finally {
                yield connection.end();
            }
        });
    }
    create(request_id, product_id, quantity, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [result] = yield connection.execute("INSERT INTO requests_item (request_id, product_id, quantity, price) VALUES (?, ?, ?, ?)", [request_id, product_id, quantity, price]);
                return {
                    id: result.insertId,
                    request_id,
                    product_id,
                    quantity,
                    price,
                };
            }
            catch (error) {
                throw new Error("Erro ao criar item do pedido");
            }
            finally {
                yield connection.end();
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM requests_item WHERE id = ?", [id]);
                if (rows.length === 0) {
                    throw new Error("Item do pedido não encontrado");
                }
                const [deleteResult] = yield connection.execute("DELETE FROM requests_item WHERE id = ?", [id]);
                return deleteResult;
            }
            catch (error) {
                throw new Error("Erro ao deletar item do pedido");
            }
            finally {
                connection.end();
            }
        });
    }
    update(id, request_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM requests_item WHERE id = ?", [id]);
                if (rows.length === 0) {
                    throw new Error("Item do pedido não encontrado");
                }
                const [updateResult] = yield connection.execute("UPDATE requests_item SET request_id = ?, product_id = ?, quantity = ? WHERE id = ?", [request_id, product_id, quantity, id]);
                return updateResult;
            }
            catch (error) {
                throw new Error("Erro ao atualizar item do pedido");
            }
            finally {
                connection.end();
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM requests_item WHERE id = ?", [id]);
                if (rows.length === 0) {
                    throw new Error("Item do pedido não encontrado");
                }
                return rows[0];
            }
            catch (error) {
                throw new Error("Erro ao buscar item do pedido");
            }
            finally {
                connection.end();
            }
        });
    }
}
exports.RequestsItemService = RequestsItemService;
