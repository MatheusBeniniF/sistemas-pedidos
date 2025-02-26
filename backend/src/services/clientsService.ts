import { createConnection } from "../database";
import * as mysql from "mysql2/promise";

export class ClientsService {
  async getAllClients() {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>("SELECT * FROM clients");
      return {
        clients: rows
      };
    } catch (error) {
      throw new Error("Erro ao buscar clientes");
    } finally {
      connection.end();
    }
  }

  async register(client: { name: string; email: string }) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.ResultSetHeader>("INSERT INTO clients (name, email) VALUES (?, ?)", [
        client.name,
        client.email
      ]);
      return {
        id: rows.insertId,
        name: client.name,
        email: client.email
      };
    } catch (error) {
      throw new Error("Erro ao inserir cliente no banco");
    } finally {
      connection.end();
    }
  }
}
