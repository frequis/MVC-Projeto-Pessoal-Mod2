const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const runSQLScript = async () => {
  const filePath = path.join(__dirname, "initDB.sql");
  const sql = fs.readFileSync(filePath, "utf8");
  try {
    await pool.query(sql);
    console.log("Script SQL executado com sucesso!");
  } catch (err) {
    console.error("Erro ao executar o script SQL:", err);
  } finally {
    await pool.end();
  }
};

runSQLScript();

