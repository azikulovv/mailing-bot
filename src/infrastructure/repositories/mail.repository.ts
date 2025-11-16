import Database from "better-sqlite3";
import { Mail } from "@/domain/entities/mail";
import { constants } from "@/config";
import { mailQueries } from "./sql-queries";
import { MailRepository } from "@/domain/repositories/mail.repository";

export class MailRepositorySQLite implements MailRepository {
  private db: Database.Database;

  constructor() {
    this.db = new Database(constants.DB_PATH);
    this.init();
  }

  private init() {
    this.db.prepare(mailQueries.createTable).run();
  }

  async findById(mailId: number): Promise<Mail | null> {
    const row: any = this.db.prepare<number>(mailQueries.findById).get(mailId);
    if (!row) return null;

    return new Mail(row.title, row.content, row.chats_id, row.id);
  }

  async create(mail: Mail): Promise<void> {
    this.db
      .prepare(mailQueries.createMail)
      .run({ title: mail.title, content: mail.content, chats_id: mail.chatsId });
  }

  async findAll(): Promise<Mail[]> {
    const row = this.db.prepare(mailQueries.findAll).all();
    if (!row) return [];

    return row.map((row: any) => new Mail(row.title, row.content, row.chatsId, row.id));
  }

  async deleteById(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
