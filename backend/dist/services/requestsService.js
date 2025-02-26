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
}
exports.RequestService = RequestService;
