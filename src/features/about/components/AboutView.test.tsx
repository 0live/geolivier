import { ThemeProvider } from "@/providers/ThemeProvider";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { AboutView } from "./AboutView";

// Mock matchMedia for internal components
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("AboutView", () => {
  it("renders the component successfully", () => {
    // We add MemoryRouter for the Link and ThemeProvider for the ThemeToggle
    render(
      <ThemeProvider>
        <MemoryRouter>
          <AboutView />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByText("About Feature")).toBeInTheDocument();
  });
});
