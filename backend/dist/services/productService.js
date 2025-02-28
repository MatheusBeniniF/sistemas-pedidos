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
exports.ProductService = void 0;
const database_1 = require("../database");
class ProductService {
    register(name, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM products WHERE name = ?", [name]);
                if (rows.length > 0) {
                    throw new Error("Produto já cadastrado");
                }
                const [insertResult] = yield connection.execute("INSERT INTO products (name, price) VALUES (?, ?)", [name, price]);
                return {
                    id: insertResult.insertId,
                    name,
                    price,
                };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Erro ao inserir produto no banco");
                }
            }
            finally {
                connection.end();
            }
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM products");
                return {
                    products: rows,
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
    findById(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM products WHERE id = ?", [product_id]);
                if (rows.length === 0) {
                    return null;
                }
                return rows[0];
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Erro ao buscar produto no banco");
                }
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
                const [rows] = yield connection.execute("SELECT * FROM products WHERE id = ?", [id]);
                if (rows.length === 0) {
                    throw new Error("Produto não encontrado");
                }
                const [deleteResult] = yield connection.execute("DELETE FROM products WHERE id = ?", [id]);
                return deleteResult;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Erro ao deletar produto no banco");
                }
            }
            finally {
                connection.end();
            }
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, database_1.createConnection)();
            try {
                const [rows] = yield connection.execute("SELECT * FROM products WHERE id = ?", [id]);
                if (rows.length === 0) {
                    throw new Error("Produto não encontrado");
                }
                const [verifyName] = yield connection.execute("SELECT * FROM products WHERE name = ?", [product.name]);
                if (verifyName.length > 0) {
                    throw new Error("Produto já cadastrado");
                }
                const [updateResult] = yield connection.execute("UPDATE products SET name = ?, price = ? WHERE id = ?", [product.name, product.price, id]);
                return updateResult;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Erro ao atualizar produto no banco");
                }
            }
            finally {
                connection.end();
            }
        });
    }
}
exports.ProductService = ProductService;
