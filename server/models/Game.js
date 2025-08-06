const db = require('../config/database');
const User = require('./User');

const createGameTable = async () => {
  await User.createUserTable();
  const query = `
    CREATE TABLE IF NOT EXISTS games (
      id SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(id),
      board JSONB,
      solution JSONB,
      difficulty VARCHAR(50),
      createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

createGameTable();

module.exports = {
  create: async (game) => {
    const { userId, board, solution, difficulty } = game;
    const query = 'INSERT INTO games (userId, board, solution, difficulty) VALUES ($1, $2, $3, $4) RETURNING *';
    const { rows } = await db.query(query, [userId, board, solution, difficulty]);
    return rows[0];
  },
  findOne: async (condition) => {
    const { userId } = condition;
    const query = 'SELECT * FROM games WHERE userId = $1 ORDER BY createdAt DESC LIMIT 1';
    const { rows } = await db.query(query, [userId]);
    return rows[0];
  }
};
