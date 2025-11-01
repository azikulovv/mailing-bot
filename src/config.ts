import dotenv from "dotenv";
dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN as string;
export const ADMIN_ID = process.env.ADMIN_ID as string;

if (!BOT_TOKEN) {
  throw new Error("❌ BOT_TOKEN is missing in .env file");
}

if (!ADMIN_ID) {
  throw new Error("❌ ADMIN_ID is missing in .env file");
}
