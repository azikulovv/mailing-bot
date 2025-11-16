import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dbFile = path.resolve("bot.db");
const dir = path.dirname(dbFile);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

export const db = new Database(dbFile);

// enable foreign keys
db.pragma("foreign_keys = ON");

// create tables
db.exec(`
CREATE TABLE IF NOT EXISTS mails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chats_id TEXT UNIQUE NOT NULL,
  title TEXT,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);
