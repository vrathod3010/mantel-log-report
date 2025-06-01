import { drizzleDb } from "@/drizzle/db";
import { observable } from "@legendapp/state";

type Stats = {
  uniqueIpCount: { count: number } | null;
  topUrls: { count: number; url: string }[] | null;
  topIps: { count: number; ip: string }[] | null;
};

export const stats$ = observable<Stats>({
  uniqueIpCount: null,
  topUrls: null,
  topIps: null,
});

/**
 * setStats Function
 *
 * Updates the application statistics by querying the database for:
 * - The count of unique IPs.
 * - The top 3 URLs accessed, ordered by frequency.
 * - The top 3 IPs accessing the logs, ordered by frequency.
 *
 * The results are stored in the `stats$` observable for use in the application.
 */
export const setStats = () => {
  // Query to get the count of unique IPs from the logs table
  const uniqueIps = drizzleDb.get<{ count: number }>(
    `SELECT COUNT(DISTINCT ip) as count FROM logs`
  );

  // Query to get the top 3 URLs accessed, grouped by URL and ordered by access frequency
  const topUrls = drizzleDb.all<{ count: number; url: string }>(
    `SELECT url, COUNT(*) as count FROM logs GROUP BY url ORDER BY count DESC LIMIT 3`
  );

  // Query to get the top 3 IPs accessing the logs, grouped by IP and ordered by access frequency
  const topIps = drizzleDb.all<{ count: number; ip: string }>(
    `SELECT ip, COUNT(*) as count FROM logs GROUP BY ip ORDER BY count DESC LIMIT 3`
  );

  // Update the stats observable with the queried data
  stats$.set({
    uniqueIpCount: uniqueIps, // Number of unique IPs
    topUrls: topUrls, // Top 3 accessed URLs
    topIps: topIps, // Top 3 IPs accessing the logs
  });
};

/**
 * resetStats Function
 *
 * Resets the application statistics by clearing the values in the `stats$` observable.
 * This is typically used when logs are cleared or when the application needs to reset its state.
 */
export const resetStats = () => {
  // Set all statistics to null in the stats observable
  stats$.set({
    uniqueIpCount: null, // Reset unique IP count
    topUrls: null, // Reset top URLs
    topIps: null, // Reset top IPs
  });
};
