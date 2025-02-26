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
      throw new Error("Erro ao buscar produtos");
    } finally {
      connection.end();
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
      const [rows] = await connection.execute<mysql.ResultSetHeader>(
        "INSERT INTO requests_item (request_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [request_id, product_id, quantity, price]
      );
      return {
        id: rows.insertId,
        request_id,
        product_id,
        quantity,
        price,
      };
    } catch (error) {
      throw new Error("Erro ao criar item do pedido");
    } finally {
      connection.end();
    }
  }
}
