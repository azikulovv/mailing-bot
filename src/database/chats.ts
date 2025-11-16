import { db } from "./index";

export const addMail = db.prepare(
  `INSERT OR IGNORE INTO mails (chats_id, title, content) VALUES (@chats_id, @title, @content)`
);

export const getMails = db.prepare(`SELECT * FROM mails`);

export const getMailById = db.prepare(`SELECT * FROM mails WHERE id = ?`);
