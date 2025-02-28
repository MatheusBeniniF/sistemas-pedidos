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
exports.RequestService = void 0;
const database_1 = require("../database");
class RequestService {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM requests");
                return {
                    requests: rows,
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
    create(client_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const date = new Date();
                const [rows] = yield connection.execute("INSERT INTO requests (date, client_id) VALUES (?, ?)", [date, client_id]);
                return {
                    id: rows.insertId,
                    date,
                    client_id,
                };
            }
            catch (error) {
                throw new Error("Erro ao criar pedido");
            }
            finally {
                connection.end();
            }
        });
    }
    update(id, client_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM requests WHERE id = ?", [id]);
                if (rows.length === 0) {
                    throw new Error("Pedido não encontrado");
                }
                const [updateResult] = yield connection.execute("UPDATE requests SET client_id = ? WHERE id = ?", [client_id, id]);
                return updateResult;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Erro ao atualizar pedido");
                }
            }
            finally {
                connection.end();
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM requests WHERE id = ?", [id]);
                if (rows.length === 0) {
                    throw new Error("Pedido não encontrado");
                }
                const [deleteResult] = yield connection.execute("DELETE FROM requests WHERE id = ?", [id]);
                return deleteResult;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Erro ao deletar pedido");
                }
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
                const [rows] = yield connection.execute("SELECT * FROM requests WHERE id = ?", [id]);
                if (rows.length === 0) {
                    throw new Error("Pedido não encontrado");
                }
                return rows[0];
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Erro ao buscar pedido");
                }
            }
            finally {
                connection.end();
            }
        });
    }
}
exports.RequestService = RequestService;
