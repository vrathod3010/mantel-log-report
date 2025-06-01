import { logs } from "@/drizzle/schema";
import { drizzleDb } from "@/drizzle/db";
import { setStats } from "@/store/stats";
import { parseLogLine } from "../parseLogLine/parseLogLine";

/**
 * uploadFile Function
 *
 * Handles the process of uploading a log file, parsing its contents, and storing the data in the database.
 *
 * Steps:
 * 1. Clears existing logs from the database if any exist.
 * 2. Reads the uploaded file and splits its content into individual lines.
 * 3. Parses each line using the `parseLogLine` function.
 * 4. Inserts parsed log data into the database.
 * 5. Updates application statistics using the `setStats` function.
 *
 * @param e - The change event triggered by the file input element.
 */
export const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
  // Check if there are existing logs in the database and clear them
  if ((await drizzleDb.$count(logs)) > 0) {
    drizzleDb.run("DELETE FROM logs;"); // Clear existing logs
  }

  // Get the uploaded file from the input element
  const file = e.target.files?.[0];
  if (!file) return; // Exit if no file is selected

  // Read the file content as text
  const text = await file.text();
  // Split the file content into individual lines
  const lines = text.split("\n");

  // Iterate over each line and parse it
  for (const line of lines) {
    const parsed = parseLogLine(line); // Parse the log line
    if (parsed) {
      // Insert the parsed log data into the database
      await drizzleDb.insert(logs).values(parsed);
    }
  }

  // Update application statistics after processing the logs
  setStats();
};
