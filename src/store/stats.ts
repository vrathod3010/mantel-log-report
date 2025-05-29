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

export const setStats = () => {
  const uniqueIps = drizzleDb.get<{ count: number }>(
    `SELECT COUNT(DISTINCT ip) as count FROM logs`
  );
  const topUrls = drizzleDb.all<{ count: number; url: string }>(
    `SELECT url, COUNT(*) as count FROM logs GROUP BY url ORDER BY count DESC LIMIT 3`
  );
  const topIps = drizzleDb.all<{ count: number; ip: string }>(
    `SELECT ip, COUNT(*) as count FROM logs GROUP BY ip ORDER BY count DESC LIMIT 3`
  );

  stats$.set({
    uniqueIpCount: uniqueIps,
    topUrls: topUrls,
    topIps: topIps,
  });
};

export const resetStats = () => {
  stats$.set({
    uniqueIpCount: null,
    topUrls: null,
    topIps: null,
  });
};
