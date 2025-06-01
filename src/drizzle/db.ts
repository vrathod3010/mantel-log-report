import { drizzle } from "drizzle-orm/sql-js";
import initSqlJs from "sql.js";

/**
 * Initialize SQL.js
 *
 * The `initSqlJs` function loads the SQL.js library, specifying the location of its WebAssembly file.
 * The `locateFile` function ensures the WebAssembly file is loaded from the correct URL.
 */
const SQL = await initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`, // Path to the SQL.js WebAssembly file
});

/**
 * Create an in-memory SQLite database
 *
 * The `SQL.Database` constructor initializes a new SQLite database that resides in memory.
 * This database will be used for storing and querying log data.
 */
const db = new SQL.Database();

/**
 * Wrap the SQLite database with Drizzle ORM
 *
 * The `drizzle` function integrates the SQLite database with Drizzle ORM, enabling type-safe queries and schema management.
 */
export const drizzleDb = drizzle(db);

/**
 * Create the logs table
 *
 * The `logs` table is created in the SQLite database to store log data.
 * It includes the following columns:
 * - `id`: Primary key, auto-incremented integer.
 * - `ip`: IP address of the client (text).
 * - `datetime`: Date and time of the request (text).
 * - `method`: HTTP method (e.g., GET, POST) (text).
 * - `url`: URL accessed (text).
 * - `status`: HTTP status code (integer).
 * - `user_agent`: User agent string (text).
 */
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
