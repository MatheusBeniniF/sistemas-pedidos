import * as mysql from "mysql2/promise";

export function createConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sistema_pedidos",
    port: 33061,
  });
}
