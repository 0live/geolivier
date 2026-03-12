import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import { I18nLoaderSync } from "./I18nLoaderSync";

// Mock the i18n module with event emitter behavior
const listeners: Record<string, Array<() => void>> = {};
vi.mock("@/app/config/i18n", () => ({
  default: {
    on: (event: string, handler: () => void) => {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(handler);
    },
    off: (event: string, handler: () => void) => {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter((h) => h !== handler);
      }
    },
  },
}));

// Mock useRevalidator to spy on revalidate calls
const mockRevalidate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useRevalidator: () => ({
      revalidate: mockRevalidate,
      state: "idle",
    }),
  };
});

function renderWithRouter(initialPath: string) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <I18nLoaderSync />,
        children: [{ path: "*", element: null }],
      },
    ],
    { initialEntries: [initialPath] }
  );

  return render(<RouterProvider router={router} />);
}

function emitLanguageChanged() {
  listeners["languageChanged"]?.forEach((handler) => handler());
}

describe("I18nLoaderSync", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset listeners between tests
    Object.keys(listeners).forEach((key) => delete listeners[key]);
  });

  afterEach(() => {
    cleanup();
  });

  it("revalidates when language changes on /projects", () => {
    renderWithRouter("/projects");
    emitLanguageChanged();
    expect(mockRevalidate).toHaveBeenCalledOnce();
  });

  it("revalidates when language changes on /projects/:slug", () => {
    renderWithRouter("/projects/some-project");
    emitLanguageChanged();
    expect(mockRevalidate).toHaveBeenCalledOnce();
  });

  it("revalidates when language changes on /blog", () => {
    renderWithRouter("/blog");
    emitLanguageChanged();
    expect(mockRevalidate).toHaveBeenCalledOnce();
  });

  it("revalidates when language changes on /blog/:slug", () => {
    renderWithRouter("/blog/some-post");
    emitLanguageChanged();
    expect(mockRevalidate).toHaveBeenCalledOnce();
  });

  it("does NOT revalidate on unrelated routes", () => {
    renderWithRouter("/about");
    emitLanguageChanged();
    expect(mockRevalidate).not.toHaveBeenCalled();
  });

  it("does NOT revalidate on root route", () => {
    renderWithRouter("/");
    emitLanguageChanged();
    expect(mockRevalidate).not.toHaveBeenCalled();
  });

  it("cleans up the event listener on unmount", () => {
    const { unmount } = renderWithRouter("/projects");
    expect(listeners["languageChanged"]).toHaveLength(1);
    unmount();
    expect(listeners["languageChanged"]).toHaveLength(0);
  });
});
