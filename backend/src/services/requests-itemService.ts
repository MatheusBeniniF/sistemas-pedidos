import { createConnection } from "../database";
import * as mysql from "mysql2/promise";

export class RequestsItemService {
  async getAllRequestsItem() {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM requests_item"
      );
      return {
        requests_item: rows,
      };
    } catch (error) {
      console.error("Erro ao buscar itens do pedido:", error);
      throw new Error("Erro ao buscar itens do pedido");
    } finally {
      await connection.end();
    }
  }

  async create(
    request_id: number,
    product_id: number,
    quantity: number,
    price: number
  ) {
    const connection = await createConnection();
    try {
      const [result] = await connection.execute<mysql.ResultSetHeader>(
        "INSERT INTO requests_item (request_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [request_id, product_id, quantity, price]
      );

      return {
        id: result.insertId,
        request_id,
        product_id,
        quantity,
        price,
      };
    } catch (error) {
      throw new Error("Erro ao criar item do pedido");
    } finally {
      await connection.end();
    }
  }

  async delete(id: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM requests_item WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        throw new Error("Item do pedido não encontrado");
      }
      const [deleteResult] = await connection.execute<mysql.ResultSetHeader>(
        "DELETE FROM requests_item WHERE id = ?",
        [id]
      );

      return deleteResult;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Erro ao deletar item do pedido");
      }
    } finally {
      connection.end();
    }
  }

  async update(id: number, request_id: number, product_id: number, quantity: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM requests_item WHERE request_id = ?",
        [id]
      );
      if (rows.length === 0) {
        throw new Error("Item do pedido não encontrado");
      }
      const [updateResult] = await connection.execute<mysql.ResultSetHeader>(
        "UPDATE requests_item SET request_id = ?, product_id = ?, quantity = ? WHERE id = ?",
        [request_id, product_id, quantity, id]
      );      
      return updateResult;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Erro ao atualizar item do pedido");
      }
    } finally {
      connection.end();
    }
  }

  async findById(id: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM requests_item WHERE request_id = ?",
        [id]
      );
      if (rows.length === 0) {
        throw new Error("Item do pedido não encontrado");
      }
      return rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Erro ao buscar item do pedido");
      }
    } finally {
      connection.end();
    }
  }
}
