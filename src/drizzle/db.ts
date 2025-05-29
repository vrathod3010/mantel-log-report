import { drizzle } from "drizzle-orm/sql-js";
import initSqlJs from "sql.js";

const SQL = await initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
});
const db = new SQL.Database();
export const drizzleDb = drizzle(db);

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
