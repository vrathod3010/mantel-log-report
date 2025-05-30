import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { IpCount } from "./ipCount";
import { stats$ } from "@/store/stats";
import "@testing-library/jest-dom";

vi.mock("@/drizzle/db", () => ({
  drizzleDb: {
    get: vi.fn(),
    all: vi.fn(),
  },
}));

describe("<IpCount />", () => {
  beforeEach(() => {
    // Reset state before each test
    stats$.set({
      uniqueIpCount: null,
      topUrls: null,
      topIps: null,
    });
  });

  it("renders nothing when ip count is null", () => {
    render(<IpCount />);
    expect(screen.queryByText("Total IP")).not.toBeInTheDocument();
  });

  it("renders the correct IP count", () => {
    stats$.uniqueIpCount.set({ count: 42 });

    render(<IpCount />);

    expect(screen.getByText("Total IP")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
