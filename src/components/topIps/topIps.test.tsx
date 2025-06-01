import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopIps } from "./topIps";
import { stats$ } from "@/store/stats";
import "@testing-library/jest-dom";

vi.mock("@/drizzle/db", () => ({
  drizzleDb: {
    get: vi.fn(),
    all: vi.fn(),
  },
}));

describe("<TopIps />", () => {
  beforeEach(() => {
    // Reset state before each test
    stats$.set({
      uniqueIpCount: null,
      topUrls: null,
      topIps: null,
    });
  });

  it("renders nothing when topIps is null", () => {
    render(<TopIps />);
    expect(screen.queryByText("Top IPs")).not.toBeInTheDocument();
  });

  it("renders the correct IPs and counts", () => {
    stats$.topIps.set([
      { ip: "192.168.1.1", count: 10 },
      { ip: "10.0.0.1", count: 5 },
    ]);

    render(<TopIps />);

    expect(screen.getByText("Top IPs")).toBeInTheDocument();
    expect(screen.getByText("192.168.1.1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("10.0.0.1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
