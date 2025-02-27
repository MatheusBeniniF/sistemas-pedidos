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
exports.ClientsService = void 0;
const database_1 = require("../database");
class ClientsService {
    getAllClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM clients");
                return {
                    clients: rows
                };
            }
            catch (error) {
                throw new Error("Erro ao buscar clientes");
            }
            finally {
                connection.end();
            }
        });
    }
    register(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM clients WHERE email = ?", [client.email]);
                if (rows.length > 0) {
                    throw new Error("Email já cadastrado");
                }
                const [insertResult] = yield connection.execute("INSERT INTO clients (name, email) VALUES (?, ?)", [
                    client.name,
                    client.email
                ]);
                return {
                    id: insertResult.insertId,
                    name: client.name,
                    email: client.email
                };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Erro ao inserir cliente no banco");
                }
            }
            finally {
                connection.end();
            }
        });
    }
    update(id, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM clients WHERE id = ?", [id]);
                if (rows.length === 0) {
                    throw new Error("Cliente não encontrado");
                }
                const [updateResult] = yield connection.execute("UPDATE clients SET name = ?, email = ? WHERE id = ?", [
                    client.name,
                    client.email,
                    id
                ]);
                return updateResult;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Erro ao atualizar cliente no banco");
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
                const [rows] = yield connection.execute("SELECT * FROM clients WHERE id = ?", [id]);
                if (rows.length === 0) {
                    throw new Error("Cliente não encontrado");
                }
                const [deleteResult] = yield connection.execute("DELETE FROM clients WHERE id = ?", [id]);
                return deleteResult;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Erro ao deletar cliente no banco");
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
                const [rows] = yield connection.execute("SELECT * FROM clients WHERE id = ?", [id]);
                if (rows.length === 0) {
                    throw new Error("Cliente não encontrado");
                }
                return rows[0];
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Erro ao buscar cliente no banco");
                }
            }
            finally {
                connection.end();
            }
        });
    }
}
exports.ClientsService = ClientsService;
