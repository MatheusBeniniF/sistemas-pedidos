"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    host: process.env.MYSQL_HOST, // localhost or remote server IP
    user: process.env.MYSQL_USER, // username (e.g., root or custom user)
    password: process.env.MYSQL_PASSWORD, // password for MySQL user
    database: process.env.MYSQL_DATABASE, // the name of the database
    port: Number(process.env.MYSQL_PORT), // default MySQL port is 3306
    waitForConnections: true,
});
exports.default = pool;
