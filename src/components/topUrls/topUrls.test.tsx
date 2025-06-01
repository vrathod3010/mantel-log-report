import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopUrls } from "./topUrls";
import { stats$ } from "@/store/stats";
import "@testing-library/jest-dom";

vi.mock("@/drizzle/db", () => ({
  drizzleDb: {
    get: vi.fn(),
    all: vi.fn(),
  },
}));

describe("<TopUrls />", () => {
  beforeEach(() => {
    // Reset store state before each test
    stats$.set({
      uniqueIpCount: null,
      topUrls: null,
      topIps: null,
    });
  });

  it("renders nothing when topUrls is null", () => {
    render(<TopUrls />);
    expect(screen.queryByText("Top URLs")).not.toBeInTheDocument();
  });

  it("renders the correct URLs and counts", () => {
    stats$.topUrls.set([
      { url: "/home", count: 12 },
      { url: "/about", count: 8 },
    ]);

    render(<TopUrls />);

    expect(screen.getByText("Top URLs")).toBeInTheDocument();
    expect(screen.getByText("/home")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("/about")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });
});
