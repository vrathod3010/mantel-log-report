import { logs } from "../../drizzle/schema";
import { drizzleDb } from "@/drizzle/db";
import { setStats } from "@/store/stats";

export const parseLogLine = (line: string) => {
  const regex =
    /^(\S+) \S+ \S+ \[([^\]]+)] "(GET|POST|PUT|DELETE|HEAD) ([^ ]+) [^"]+" (\d{3}) \d+ "[^"]*" "([^"]*)"/;

  const match = line.match(regex);
  if (!match) return null;

  const [, ip, datetime, method, url, status, userAgent] = match;
  return { ip, datetime, method, url, status: parseInt(status, 10), userAgent };
};

export const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if ((await drizzleDb.$count(logs)) > 0) {
    drizzleDb.run("DELETE FROM logs;"); // Clear existing logs
  }
  const file = e.target.files?.[0];
  if (!file) return;

  const text = await file.text();
  const lines = text.split("\n");

  for (const line of lines) {
    const parsed = parseLogLine(line);
    if (parsed) {
      await drizzleDb.insert(logs).values(parsed);
    }
  }

  setStats();
};
