import pool from "../database"

export const productService = {
  async createProduct(name: string, price: number) {
    try {
      await pool.query("INSERT INTO produtos (nome, preco) VALUES (?, ?)", [
        name,
        price,
      ]);
    } catch (error) {
      throw new Error("Erro ao inserir produto no banco");
    }
  },

  async getAllProducts() {
    try {
      const [rows] = await pool.query("SELECT * FROM produtos");
      return rows;
    } catch (error) {
      throw new Error("Erro ao buscar produtos");
    }
  },
};
