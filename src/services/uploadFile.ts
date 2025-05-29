import { observable } from "@legendapp/state";
import initSqlJs from "sql.js";
import { drizzle } from "drizzle-orm/sql-js";
import { logs } from "@/drizzle/schema";

export const states$ = observable<{
  uniqueIpCount: { count: number };
  topUrls: { count: number; url: string }[];
  topIps: { count: number; ip: string }[];
}>({
  uniqueIpCount: { count: 0 },
  topUrls: [],
  topIps: [],
});

export function parseLogLine(line: string) {
  const regex =
    /^(\S+) \S+ \S+ \[([^\]]+)] "(GET|POST|PUT|DELETE|HEAD) ([^ ]+) [^"]+" (\d{3}) \d+ "[^"]*" "([^"]*)"/;

  const match = line.match(regex);
  if (!match) return null;

  const [, ip, datetime, method, url, status, userAgent] = match;
  return { ip, datetime, method, url, status: parseInt(status, 10), userAgent };
}

export const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });
  const db = new SQL.Database();
  const drizzleDb = drizzle(db);

  drizzleDb.run(
    `CREATE TABLE logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT,
        datetime TEXT,
        method TEXT,
        url TEXT,
        status INTEGER,
        user_agent TEXT
      )`
  );

  const text = await file.text();
  const lines = text.split("\n");

  for (const line of lines) {
    const parsed = parseLogLine(line);
    if (parsed) {
      await drizzleDb.insert(logs).values(parsed);
    }
  }

  const uniqueIps = drizzleDb.get(
    `SELECT COUNT(DISTINCT ip) as count FROM logs`
  );
  const topUrls = drizzleDb.all(
    `SELECT url, COUNT(*) as count FROM logs GROUP BY url ORDER BY count DESC LIMIT 3`
  );
  const topIps = drizzleDb.all(
    `SELECT ip, COUNT(*) as count FROM logs GROUP BY ip ORDER BY count DESC LIMIT 3`
  );

  states$.set({
    uniqueIpCount: uniqueIps as { count: number },
    topUrls: topUrls as { count: number; url: string }[],
    topIps: topIps as { count: number; ip: string }[],
  });
};
