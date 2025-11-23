import Database from "better-sqlite3";
import { constants } from "@/config";
import { newsletterQueries } from "./sql-queries";
import { Newsletter } from "@/domain/entities/newsletter";
import { NewsletterRepository } from "@/domain/repositories/mail.repository";

export class MailRepositorySQLite implements NewsletterRepository {
  private db: Database.Database;

  constructor() {
    this.db = new Database(constants.DB_PATH);
    this.init();
  }

  private init() {
    this.db.prepare(newsletterQueries.createTable).run();
  }

  async findById(newsletterId: number): Promise<Newsletter | null> {
    const row: any = this.db.prepare<number>(newsletterQueries.findById).get(newsletterId);
    if (!row) return null;

    return new Newsletter(row.title, row.chat_ids, row.forward_message_id, row.id);
  }

  async create(newsletter: Newsletter): Promise<void> {
    this.db.prepare(newsletterQueries.createNewsLetter).run({
      title: newsletter.title,
      chat_ids: newsletter.chatIds,
      forward_message_id: newsletter.forwardMessageId,
    });
  }

  async findAll(): Promise<Newsletter[]> {
    const row = this.db.prepare(newsletterQueries.findAll).all();
    if (!row) return [];

    return row.map((row: any) => new Newsletter(row.title, row.content, row.chatsId, row.id));
  }

  async deleteById(id: number): Promise<void> {
    const stmt = this.db.prepare(newsletterQueries.deleteById);
    const result = stmt.run(id);

    if (result.changes === 0) {
      throw new Error(`Newsletter with id ${id} not found`);
    }
  }
}
