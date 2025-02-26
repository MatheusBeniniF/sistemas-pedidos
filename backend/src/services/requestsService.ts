import { createConnection } from "../database";
import * as mysql from "mysql2/promise";

export class RequestService {
  async getAllProducts() {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM requests"
      );
      
      return {
        requests: rows,
      };
    } catch (error) {
      throw new Error("Erro ao buscar produtos");
    } finally {
      connection.end();
    }
  }

  async create(client_id: number) {
    const connection = await createConnection();
    try {
      const date = new Date();
      const [rows] = await connection.execute<mysql.ResultSetHeader>(
        "INSERT INTO requests (date, client_id) VALUES (?, ?)",
        [date, client_id]
      );
      
      return {
        id: rows.insertId,
        date,
        client_id,
      };
    } catch (error) {
      throw new Error("Erro ao criar pedido");
    } finally {
      connection.end();
    }
  }

  async update(id: number, client_id: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM requests WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        throw new Error("Pedido não encontrado");
      }
      const [updateResult] = await connection.execute<mysql.ResultSetHeader>(
        "UPDATE requests SET client_id = ? WHERE id = ?",
        [client_id, id]
      );
      
      return updateResult;
    } catch (error) {
      throw new Error("Erro ao atualizar pedido");
    } finally {
      connection.end();
    }
  }

  async delete(id: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM requests WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        throw new Error("Pedido não encontrado");
      }
      const [deleteResult] = await connection.execute<mysql.ResultSetHeader>(
        "DELETE FROM requests WHERE id = ?",
        [id]
      );
      
      return deleteResult;
    } catch (error) {
      throw new Error("Erro ao deletar pedido");
    } finally {
      connection.end();
    }
  }

  async findById(id: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>(
        "SELECT * FROM requests WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        throw new Error("Pedido não encontrado");
      }
      
      return rows[0];
    } catch (error) {
      throw new Error("Erro ao buscar pedido");
    } finally {
      connection.end();
    }
  }
}
