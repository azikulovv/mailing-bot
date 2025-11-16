export const mailQueries = {
  createTable: `
    CREATE TABLE IF NOT EXISTS mails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chats_id TEXT UNIQUE NOT NULL,
      title TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
  findById: `SELECT * FROM mails WHERE id = ?`,
  createMail: `INSERT OR IGNORE INTO mails (chats_id, title, content) VALUES (@chats_id, @title, @content)`,
  findAll: `SELECT * FROM mails`,
  deleteById: ``,
};
