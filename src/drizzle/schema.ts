// drizzle/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const logs = sqliteTable("logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ip: text("ip"),
  datetime: text("datetime"),
  method: text("method"),
  url: text("url"),
  status: integer("status"),
  userAgent: text("user_agent"),
});
