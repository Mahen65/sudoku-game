const db = require('../config/database');

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      googleId VARCHAR(255) UNIQUE NOT NULL,
      displayName VARCHAR(255),
      email VARCHAR(255)
    );
  `;
  await db.query(query);
};

module.exports = {
  createUserTable,
  findOne: async (condition) => {
    const { googleId } = condition;
    const query = 'SELECT * FROM users WHERE googleId = $1';
    const { rows } = await db.query(query, [googleId]);
    return rows[0];
  },
  create: async (user) => {
    const { googleId, displayName, email } = user;
    const query = 'INSERT INTO users (googleId, displayName, email) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await db.query(query, [googleId, displayName, email]);
    return rows[0];
  },
  findById: async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
};
