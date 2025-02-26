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
        console.error(error);
      throw new Error("Erro ao inserir cliente no banco");
    } finally {
      connection.end();
    }
  }

  async update(id: number, client: { name: string; email: string }) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>("SELECT * FROM clients WHERE id = ?", [id]);
      if (rows.length === 0) {
        throw new Error("Cliente não encontrado");
      }
      const [updateResult] = await connection.execute<mysql.ResultSetHeader>("UPDATE clients SET name = ?, email = ? WHERE id = ?", [
        client.name,
        client.email,
        id
      ]);
      return updateResult;
    } catch (error) {
      throw new Error("Erro ao atualizar cliente");
    } finally {
      connection.end();
    }
  }

  async delete(id: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>("SELECT * FROM clients WHERE id = ?", [id]);
      if (rows.length === 0) {
        throw new Error("Cliente não encontrado");
      }
      const [deleteResult] = await connection.execute<mysql.ResultSetHeader>("DELETE FROM clients WHERE id = ?", [id]);
      return deleteResult;
    } catch (error) {
      throw new Error("Erro ao deletar cliente");
    } finally {
      connection.end();
    }
  }

  async findById(id: number) {
    const connection = await createConnection();
    try {
      const [rows] = await connection.execute<mysql.RowDataPacket[]>("SELECT * FROM clients WHERE id = ?", [id]);
      if (rows.length === 0) {
        throw new Error("Cliente não encontrado");
      }
      return rows[0];
    } catch (error) {
      throw new Error("Erro ao buscar cliente");
    } finally {
      connection.end();
    }
  }
}
