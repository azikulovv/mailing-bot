export const newsletterQueries = {
  createTable: `
    CREATE TABLE IF NOT EXISTS newsletters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      chat_ids TEXT NOT NULL,
      forward_message_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
  findById: `SELECT * FROM newsletters WHERE id = ?`,
  createNewsLetter: `INSERT OR IGNORE INTO newsletters (title, chat_ids, forward_message_id) VALUES (@title, @chat_ids, @forward_message_id)`,
  findAll: `SELECT * FROM newsletters`,
  deleteById: `DELETE FROM newsletters WHERE id = ?`,
};
