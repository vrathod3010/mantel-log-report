import { describe, it, expect, vi, beforeEach } from "vitest";
import { stats$, setStats, resetStats } from "@/store/stats";
import { drizzleDb } from "@/drizzle/db";

vi.mock("@/drizzle/db", () => ({
  drizzleDb: {
    get: vi.fn(),
    all: vi.fn(),
  },
}));

describe("stats state", () => {
  beforeEach(() => {
    resetStats();
    vi.clearAllMocks();
  });

  it("should reset stats to null values", () => {
    // Pre-set some values
    stats$.set({
      uniqueIpCount: { count: 123 },
      topUrls: [{ url: "/home", count: 50 }],
      topIps: [{ ip: "127.0.0.1", count: 30 }],
    });

    resetStats();

    expect(stats$.get()).toEqual({
      uniqueIpCount: null,
      topUrls: null,
      topIps: null,
    });
  });

  it("should set stats from drizzleDb queries", () => {
    const uniqueIpMock = { count: 10 };
    const topUrlsMock = [
      { url: "/page1", count: 20 },
      { url: "/page2", count: 15 },
      { url: "/page3", count: 10 },
    ];
    const topIpsMock = [
      { ip: "192.168.1.1", count: 8 },
      { ip: "192.168.1.2", count: 6 },
      { ip: "192.168.1.3", count: 5 },
    ];

    (drizzleDb.get as any).mockReturnValue(uniqueIpMock);
    (drizzleDb.all as any)
      .mockReturnValueOnce(topUrlsMock)
      .mockReturnValueOnce(topIpsMock);

    setStats();

    expect(drizzleDb.get).toHaveBeenCalledWith(
      `SELECT COUNT(DISTINCT ip) as count FROM logs`
    );
    expect(drizzleDb.all).toHaveBeenCalledWith(
      `SELECT url, COUNT(*) as count FROM logs GROUP BY url ORDER BY count DESC LIMIT 3`
    );
    expect(drizzleDb.all).toHaveBeenCalledWith(
      `SELECT ip, COUNT(*) as count FROM logs GROUP BY ip ORDER BY count DESC LIMIT 3`
    );

    expect(stats$.get()).toEqual({
      uniqueIpCount: uniqueIpMock,
      topUrls: topUrlsMock,
      topIps: topIpsMock,
    });
  });
});
