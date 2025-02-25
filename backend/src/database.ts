import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST,           // localhost or remote server IP
  user: process.env.MYSQL_USER,           // username (e.g., root or custom user)
  password: process.env.MYSQL_PASSWORD,   // password for MySQL user
  database: process.env.MYSQL_DATABASE,   // the name of the database
  port: Number(process.env.MYSQL_PORT),   // default MySQL port is 3306
  waitForConnections: true,
});

export default pool;
