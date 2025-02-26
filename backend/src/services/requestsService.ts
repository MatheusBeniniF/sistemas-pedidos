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
}
