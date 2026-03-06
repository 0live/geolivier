import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AboutView } from "./AboutView";

// Note: No need to mock ThemeProvider or Router anymore since the layout
// has been abstracted up to AppLayout/AppProviders. We can test the view in isolation.

// Mock react-i18next inline
vi.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("AboutView", () => {
  it("renders the component successfully", () => {
    render(<AboutView />);
    expect(screen.getByText("About Feature")).toBeInTheDocument();
  });
});
