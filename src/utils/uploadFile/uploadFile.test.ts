import { describe, it, expect, vi, beforeEach } from "vitest";
import { uploadFile, parseLogLine } from "./uploadFile";
import { drizzleDb } from "@/drizzle/db";
import { setStats } from "@/store/stats";
import { logs } from "@/drizzle/schema";

// Mock dependencies
vi.mock("@/drizzle/db", () => ({
  drizzleDb: {
    $count: vi.fn(),
    run: vi.fn(),
    insert: vi.fn(() => ({
      values: vi.fn(),
    })),
  },
}));
vi.mock("@/store/stats", () => ({
  setStats: vi.fn(),
}));

describe("parseLogLine", () => {
  it("parses valid log lines correctly", () => {
    const line = `192.168.0.1 - - [28/May/2024:15:45:12 +0000] "GET /index.html HTTP/1.1" 200 1024 "-" "Mozilla/5.0"`;
    const parsed = parseLogLine(line);
    expect(parsed).toEqual({
      ip: "192.168.0.1",
      datetime: "28/May/2024:15:45:12 +0000",
      method: "GET",
      url: "/index.html",
      status: 200,
      userAgent: "Mozilla/5.0",
    });
  });

  it("returns null for invalid log lines", () => {
    const line = `INVALID LOG FORMAT`;
    const parsed = parseLogLine(line);
    expect(parsed).toBeNull();
  });
});

describe("uploadFile", () => {
  const mockFile = new File(
    [
      `192.168.0.1 - - [28/May/2024:15:45:12 +0000] "GET /index.html HTTP/1.1" 200 1024 "-" "Mozilla/5.0"\n` +
        `invalid line\n` +
        `127.0.0.1 - - [29/May/2024:16:00:00 +0000] "POST /submit HTTP/1.1" 201 2048 "-" "Chrome/90"`,
    ],
    "access.log",
    { type: "text/plain" }
  );

  const createMockEvent = (): React.ChangeEvent<HTMLInputElement> =>
    ({
      target: {
        files: [mockFile],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("parses valid lines, inserts them into DB, and sets stats", async () => {
    (drizzleDb.$count as any).mockResolvedValue(2);
    const insertValuesMock = vi.fn();
    (drizzleDb.insert as any).mockReturnValue({ values: insertValuesMock });

    await uploadFile(createMockEvent());

    expect(drizzleDb.run).toHaveBeenCalledWith("DELETE FROM logs;");
    expect(drizzleDb.insert).toHaveBeenCalledWith(logs);
    expect(insertValuesMock).toHaveBeenCalledTimes(2); // one invalid line ignored
    expect(setStats).toHaveBeenCalled();
  });

  it("does nothing if no file is provided", async () => {
    const event = {
      target: { files: null },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    await uploadFile(event);
    expect(drizzleDb.insert).not.toHaveBeenCalled();
    expect(setStats).not.toHaveBeenCalled();
  });
});
