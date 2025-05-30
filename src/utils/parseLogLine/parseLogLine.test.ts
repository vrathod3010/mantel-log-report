import { describe, expect, it } from "vitest";
import { parseLogLine } from "./parseLogLine";

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
