import React from "react";
import { render, screen } from "@testing-library/react";
import { useTheme } from "@nimbus-ds/styles";

import { MenuButton } from "./MenuButton";

jest.mock("@nimbus-ds/styles", () => ({
  ...jest.requireActual("@nimbus-ds/styles"),
  useTheme: jest.fn(),
}));

const mockedUseTheme = useTheme as jest.Mock;

const setTheme = (currentTheme: string) =>
  mockedUseTheme.mockReturnValue({ currentTheme, changeTheme: jest.fn() });

const labelText = "Button label";
const contentText = "Accordion content";

const tokensOf = (element: Element | null | undefined) =>
  `${element?.className ?? ""} ${element?.getAttribute("style") ?? ""}`;

const getButton = () => screen.getByTestId("button-element");
const getLabel = () => screen.getByText(labelText);

describe("GIVEN <MenuButton /> under each theme", () => {
  afterEach(() => mockedUseTheme.mockReset());

  describe.each(["next-norteui", "next-norteui-dark"])(
    "WHEN the theme is %s",
    (theme) => {
      beforeEach(() => setTheme(theme));

      it("SHOULD render the rest label with neutral-textLow", () => {
        render(<MenuButton label={labelText} data-testid="button-element" />);
        expect(tokensOf(getLabel())).toContain("neutral-textLow");
      });

      it("SHOULD use neutral-surfaceHighlight on hover", () => {
        render(<MenuButton label={labelText} data-testid="button-element" />);
        expect(tokensOf(getButton())).toContain("neutral-surfaceHighlight");
        expect(tokensOf(getButton())).not.toContain("primary-surface");
      });

      it("SHOULD render the active button with neutral-background and primary-interactive", () => {
        render(
          <MenuButton active label={labelText} data-testid="button-element" />
        );
        expect(tokensOf(getButton())).toContain("neutral-background");
        expect(tokensOf(getLabel())).toContain("primary-interactive");
      });

      it("SHOULD render the active accordion with neutral-background", () => {
        render(
          <MenuButton.Accordion
            active
            open
            contentid="content-id"
            data-testid="accordion-element"
            menuButton={{ label: labelText }}
          >
            {contentText}
          </MenuButton.Accordion>
        );
        expect(tokensOf(screen.getByTestId("accordion-element"))).toContain(
          "neutral-background"
        );
      });

      it("SHOULD render the accordion items without gap", () => {
        render(
          <MenuButton.Accordion
            open
            contentid="content-id"
            menuButton={{ label: labelText }}
          >
            {contentText}
          </MenuButton.Accordion>
        );
        const items = screen.getByText(contentText);
        expect(tokensOf(items)).toMatch(/--gap-xs__\w+: 0;/);
      });
    }
  );

  describe.each(["base", "dark", "next", "next-dark"])(
    "WHEN the theme is %s",
    (theme) => {
      beforeEach(() => setTheme(theme));

      it("SHOULD keep the current tokens", () => {
        render(<MenuButton label={labelText} data-testid="button-element" />);
        expect(tokensOf(getLabel())).toContain("neutral-textHigh");
        expect(tokensOf(getButton())).toContain("primary-surface");
        expect(tokensOf(getButton())).not.toContain("neutral-surfaceHighlight");
      });

      it("SHOULD keep primary-surface on the active accordion", () => {
        render(
          <MenuButton.Accordion
            active
            open
            contentid="content-id"
            data-testid="accordion-element"
            menuButton={{ label: labelText }}
          >
            {contentText}
          </MenuButton.Accordion>
        );
        expect(tokensOf(screen.getByTestId("accordion-element"))).toContain(
          "primary-surface"
        );
      });

      it("SHOULD keep the 0-5 gap between accordion items", () => {
        render(
          <MenuButton.Accordion
            open
            contentid="content-id"
            menuButton={{ label: labelText }}
          >
            {contentText}
          </MenuButton.Accordion>
        );
        expect(tokensOf(screen.getByText(contentText))).toContain(
          "var(--nimbus-spacing-0-5)"
        );
      });
    }
  );
});
