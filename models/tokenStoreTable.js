import database from "../database/db.js";

export async function createTokenStoreTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS token_store (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await database.query(query);
  } catch (error) {
    console.error("Error creating token_store table: ", error);
  }
}
