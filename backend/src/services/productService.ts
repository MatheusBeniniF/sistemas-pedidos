import { createConnection } from "../database";
import * as mysql from "mysql2/promise";

export class ProductService {
  async register(name: string, price: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.ResultSetHeader>("INSERT INTO produtos (nome, preco) VALUES (?, ?)", [
        name,
        price
      ])

      return {
        id: rows.insertId,
        name,
        price
      }
    }
    catch (error) {
      throw new Error("Erro ao inserir produto no banco");
    }
    finally {
      connection.end();
    }
  }

  async getAllProducts() {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>("SELECT * FROM produtos");
      return {
        products: rows
      };
    } catch (error) {
      throw new Error("Erro ao buscar produtos");
    } finally {
      connection.end();
    }
  }
}
  