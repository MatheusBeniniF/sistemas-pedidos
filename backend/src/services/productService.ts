import { createConnection } from "../database";
import * as mysql from "mysql2/promise";

export class ProductService {
  async register(name: string, price: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM products WHERE name = ?",
        [name]
      );

      if (rows.length > 0) {
        throw new Error("Produto já cadastrado");
      }

      const [insertResult] = await connection.execute<mysql.ResultSetHeader>(
        "INSERT INTO products (name, price) VALUES (?, ?)",
        [name, price]
      );

      return {
        id: insertResult.insertId,
        name,
        price,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Erro ao inserir produto no banco");
      }
    } finally {
      connection.end();
    }
  }

  async getAllProducts() {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM products"
      );
      return {
        products: rows,
      };
    } catch (error) {
      throw new Error("Erro ao buscar produtos");
    } finally {
      connection.end();
    }
  }

  async findById(product_id: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM products WHERE id = ?",
        [product_id]
      );

      if (rows.length === 0) {
        return null;
      }

      return rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Erro ao buscar produto no banco");
      }
    } finally {
      await connection.end();
    }
  }

  async delete(id: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM products WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        throw new Error("Produto não encontrado");
      }
      const [deleteResult] = await connection.execute<mysql.ResultSetHeader>(
        "DELETE FROM products WHERE id = ?",
        [id]
      );

      return deleteResult;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Erro ao deletar produto no banco");
      }
    } finally {
      connection.end();
    }
  }

  async update(id: number, product: { name: string; price: number }) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM products WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        throw new Error("Produto não encontrado");
      }

      if (product.name !== rows[0].name) {
        const [verifyName] = await connection.execute<mysql.RowDataPacket[]>(
          "SELECT * FROM products WHERE name = ?",
          [product.name]
        )
        if (verifyName.length > 0) {
          throw new Error("Produto já cadastrado");
        }
      }
      const [updateResult] = await connection.execute<mysql.ResultSetHeader>(
        "UPDATE products SET name = ?, price = ? WHERE id = ?",
        [product.name, product.price, id]
      );
      return updateResult;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Erro ao atualizar produto no banco");
      }
    } finally {
      connection.end();
    }
  }
}
