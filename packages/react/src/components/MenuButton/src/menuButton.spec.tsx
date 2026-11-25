import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";
import { HomeIcon, StatsIcon } from "@nimbus-ds/icons";
import { Menu } from "@nimbus-ds/menu";

import { MenuExpandContext } from "@common/contexts";
import { noop } from "@common/utils";
import { MenuButton, MenuButtonProps } from "./MenuButton";

const labelText = "Button label";
const mockedClickFunction = jest.fn();

const allThemes: Theme[] = [
  "base",
  "dark",
  "next",
  "next-dark",
  "next-norteui",
  "next-norteui-dark",
];
const previousAppearanceThemes: Theme[] = [
  "base",
  "dark",
  "next",
  "next-dark",
  "next-norteui-dark",
];

const color = (token: string) => `var(--nimbus-colors-${token})`;
const styleVar = (el: Element, name: string) =>
  el
    .getAttribute("style")
    ?.match(new RegExp(`--${name}__[a-z0-9]+: ([^;]+)`))?.[1];
const textColorOf = (el: Element) =>
  el.getAttribute("class")?.match(/nimbus-text_color-([a-zA-Z-]+)-xs__/)?.[1];
const iconColorOf = (button: Element) =>
  button
    .querySelector("[class*='nimbus-icon_base']")
    ?.getAttribute("class")
    ?.match(/nimbus-icon_color_([a-zA-Z-]+)__/)?.[1];
const layoutOf = (el: Element) =>
  [
    ...(el.getAttribute("class") ?? "").split(" "),
    ...(el.getAttribute("style") ?? "").split(";").map((d) => d.trim()),
  ]
    .filter((token) => token && !/color/i.test(token))
    .join("|");

const expectEntryColors = (
  button: Element,
  expected: { text: string; rest: string; hover: string; pressed: string }
) => {
  expect(textColorOf(screen.getByText(labelText))).toBe(expected.text);
  expect(iconColorOf(button)).toBe(expected.text);
  expect(styleVar(button, "backgroundColor-xs")).toBe(expected.rest);
  expect(styleVar(button, "backgroundColor-hover")).toBe(expected.hover);
  expect(styleVar(button, "backgroundColor-active")).toBe(expected.pressed);
};

const renderUnderTheme = (theme: Theme, props: Partial<MenuButtonProps> = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <MenuButton label={labelText} startIcon={HomeIcon} {...props} />
    </ThemeProvider>
  );

const makeSut = (rest: Omit<MenuButtonProps, "label">) => {
  render(
    <MenuButton {...rest} label={labelText} data-testid="button-element" />
  );
};

describe("GIVEN <MenuButton />", () => {
  describe("WHEN rendered", () => {
    it("MenuButton AC-001: SHOULD render label text correctly", () => {
      makeSut({});
      expect(screen.getByText(labelText)).toBeDefined();
    });

    it("MenuButton AC-001: SHOULD render children correctly", () => {
      makeSut({ children: "My children" });
      expect(screen.getByText("My children")).toBeDefined();
    });

    it("MenuButton AC-002: SHOULD execute the onClick correctly", () => {
      makeSut({ onClick: mockedClickFunction });
      const buttonClick = screen.getByRole<HTMLButtonElement>("button");
      fireEvent.click(buttonClick);
      expect(mockedClickFunction).toHaveBeenCalled();
      expect(mockedClickFunction).toHaveBeenCalledTimes(1);
    });

    it("MenuButton AC-001: SHOULD render collapsed correctly reading from the context", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} data-testid="button-element" />
        </MenuExpandContext.Provider>
      );
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();

      // When collapsed, text should not be rendered
      expect(screen.queryByText(labelText)).toBeNull();
    });

    it("MenuButton AC-001: SHOULD render expanded correctly reading from the context", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: true,
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} data-testid="button-element" />
        </MenuExpandContext.Provider>
      );
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();

      // When expanded, text should be rendered
      expect(screen.getByText(labelText)).toBeDefined();
    });

    it("MenuButton AC-001: SHOULD render expanded correctly reading from the prop", () => {
      makeSut({ expanded: true });
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();

      // When expanded, text should be rendered
      expect(screen.getByText(labelText)).toBeDefined();
    });

    it("MenuButton AC-001: SHOULD render collapsed correctly reading from the prop", () => {
      makeSut({ expanded: false });
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();

      // When collapsed, text should not be rendered
      expect(screen.queryByText(labelText)).toBeNull();
    });

    it("MenuButton AC-001: SHOULD show only the icon when collapsed by an enclosing Menu", () => {
      const { rerender } = render(
        <Menu showPopoversWhenCollapsed={false}>
          <Menu.Button label={labelText} startIcon={HomeIcon}>
            Trailing
          </Menu.Button>
        </Menu>
      );
      expect(screen.getByText(labelText)).toBeInTheDocument();
      expect(screen.getByText("Trailing")).toBeInTheDocument();

      rerender(
        <Menu expanded={false} showPopoversWhenCollapsed={false}>
          <Menu.Button label={labelText} startIcon={HomeIcon}>
            Trailing
          </Menu.Button>
        </Menu>
      );
      const button = screen.getByRole("button");
      expect(screen.queryByText(labelText)).toBeNull();
      expect(screen.queryByText("Trailing")).toBeNull();
      expect(button.querySelector("svg")).not.toBeNull();
    });

    it("MenuButton AC-015: SHOULD render as a link keeping its attributes", () => {
      render(
        <MenuButton as="a" href="/orders" label={labelText} aria-label="Go" />
      );
      const link = screen.getByRole("link", { name: "Go" });
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/orders");
    });
  });

  describe("WHEN collapsed with popover configuration", () => {
    it("MenuButton AC-006: SHOULD wrap button with popover when collapsed and showPopoversWhenCollapsed is true", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            showPopoversWhenCollapsed: true,
            popoverPosition: "right",
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} />
        </MenuExpandContext.Provider>
      );

      const popoverContainer = screen.getByTestId("popover-container");
      expect(popoverContainer).toBeDefined();
      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
    });

    it("MenuButton AC-006: SHOULD not wrap button with popover when showPopoversWhenCollapsed is false", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: false,
            showPopoversWhenCollapsed: false,
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} />
        </MenuExpandContext.Provider>
      );

      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
      expect(screen.queryByTestId("popover-container")).toBeNull();
      expect(screen.queryByText(labelText)).toBeNull();
    });

    it("MenuButton AC-006: SHOULD not show popover when button is expanded", () => {
      render(
        <MenuExpandContext.Provider
          value={{
            expanded: true,
            showPopoversWhenCollapsed: true,
            popoverPosition: "right",
            activeAccordionPopover: null,
            setActiveAccordionPopover: noop,
          }}
        >
          <MenuButton label={labelText} />
        </MenuExpandContext.Provider>
      );

      expect(screen.getByRole<HTMLButtonElement>("button")).toBeDefined();
      expect(screen.queryByTestId("popover-container")).toBeNull();
    });

    it("MenuButton AC-006: SHOULD keep at most one popover open when hovering two collapsed entries of one Menu", async () => {
      const user = userEvent.setup();
      render(
        <Menu expanded={false}>
          <Menu.Button label="Alpha" startIcon={HomeIcon} aria-label="a" />
          <Menu.Button label="Beta" startIcon={StatsIcon} aria-label="b" />
        </Menu>
      );

      await user.hover(screen.getByRole("button", { name: "a" }));
      await waitFor(() => expect(screen.getByText("Alpha")).toBeVisible());

      await user.hover(screen.getByRole("button", { name: "b" }));
      await waitFor(() => expect(screen.getByText("Beta")).toBeVisible());
      await waitFor(() => expect(screen.queryByText("Alpha")).toBeNull());
    });
  });

  describe("WHEN popover onVisibility callback logic", () => {
    const createOnVisibilityCallback =
      (menuButtonId: string, setActiveAccordionPopover: jest.Mock) =>
      (visible: boolean) => {
        setActiveAccordionPopover((prev: string | null) => {
          if (visible) {
            return menuButtonId;
          }
          return prev === menuButtonId ? null : prev;
        });
      };

    it("MenuButton AC-006: SHOULD set activeAccordionPopover to menuButtonId when visible becomes true", () => {
      const menuButtonId = ":r1:";
      const setActiveAccordionPopover = jest.fn();
      const onVisibilityCallback = createOnVisibilityCallback(
        menuButtonId,
        setActiveAccordionPopover
      );

      onVisibilityCallback(true);

      expect(setActiveAccordionPopover).toHaveBeenCalledTimes(1);
      const updaterFunction = setActiveAccordionPopover.mock.calls[0][0];
      const result = updaterFunction(null);
      expect(result).toBe(menuButtonId);
    });

    it("MenuButton AC-006: SHOULD clear activeAccordionPopover when visible becomes false and ID matches", () => {
      const menuButtonId = ":r1:";
      const setActiveAccordionPopover = jest.fn();
      const onVisibilityCallback = createOnVisibilityCallback(
        menuButtonId,
        setActiveAccordionPopover
      );

      onVisibilityCallback(false);

      expect(setActiveAccordionPopover).toHaveBeenCalledTimes(1);
      const updaterFunction = setActiveAccordionPopover.mock.calls[0][0];
      const resultWhenMatches = updaterFunction(menuButtonId);
      expect(resultWhenMatches).toBeNull();
    });

    it("MenuButton AC-006: SHOULD preserve activeAccordionPopover when visible becomes false and ID does not match", () => {
      const menuButtonId = ":r1:";
      const differentId = ":r2:";
      const setActiveAccordionPopover = jest.fn();
      const onVisibilityCallback = createOnVisibilityCallback(
        menuButtonId,
        setActiveAccordionPopover
      );

      onVisibilityCallback(false);

      expect(setActiveAccordionPopover).toHaveBeenCalledTimes(1);
      const updaterFunction = setActiveAccordionPopover.mock.calls[0][0];
      const resultWhenDoesNotMatch = updaterFunction(differentId);
      expect(resultWhenDoesNotMatch).toBe(differentId);
    });
  });

  describe("WHEN rendered under a theme", () => {
    it("MenuButton AC-009: SHOULD use neutral-textLow at rest and neutral-surfaceHighlight on hover and press under next-norteui", () => {
      renderUnderTheme("next-norteui");
      expectEntryColors(screen.getByRole("button"), {
        text: "neutral-textLow",
        rest: "transparent",
        hover: color("neutral-surfaceHighlight"),
        pressed: color("neutral-surfaceHighlight"),
      });
    });

    it("MenuButton AC-009: SHOULD use neutral-background with primary-interactive when selected under next-norteui", () => {
      renderUnderTheme("next-norteui", { active: true });
      expectEntryColors(screen.getByRole("button"), {
        text: "primary-interactive",
        rest: color("neutral-background"),
        hover: color("neutral-surfaceHighlight"),
        pressed: color("neutral-surfaceHighlight"),
      });
    });

    it.each<Theme>(previousAppearanceThemes)(
      "MenuButton AC-010, AC-008: SHOULD keep the previous rest and selected colors under %s",
      (theme) => {
        const { unmount } = renderUnderTheme(theme);
        expectEntryColors(screen.getByRole("button"), {
          text: "neutral-textHigh",
          rest: "transparent",
          hover: color("primary-surface"),
          pressed: color("primary-surfaceHighlight"),
        });
        unmount();
        renderUnderTheme(theme, { active: true });
        expectEntryColors(screen.getByRole("button"), {
          text: "primary-interactive",
          rest: color("primary-surface"),
          hover: color("primary-surface"),
          pressed: color("primary-surfaceHighlight"),
        });
      }
    );

    it("MenuButton AC-011: SHOULD follow the nearest provider when next is nested inside next-norteui", () => {
      render(
        <ThemeProvider theme="next-norteui">
          <ThemeProvider theme="next">
            <MenuButton label={labelText} startIcon={HomeIcon} />
          </ThemeProvider>
        </ThemeProvider>
      );
      expectEntryColors(screen.getByRole("button"), {
        text: "neutral-textHigh",
        rest: "transparent",
        hover: color("primary-surface"),
        pressed: color("primary-surfaceHighlight"),
      });
    });

    it("MenuButton AC-016: SHOULD use the previous appearance without a ThemeProvider", () => {
      render(<MenuButton label={labelText} startIcon={HomeIcon} />);
      expectEntryColors(screen.getByRole("button"), {
        text: "neutral-textHigh",
        rest: "transparent",
        hover: color("primary-surface"),
        pressed: color("primary-surfaceHighlight"),
      });
    });

    it("MenuButton AC-009, AC-010: SHOULD follow the provider when the theme changes after mount", () => {
      const tree = (theme: Theme) => (
        <ThemeProvider theme={theme}>
          <MenuButton label={labelText} startIcon={HomeIcon} />
        </ThemeProvider>
      );
      const { rerender } = render(tree("base"));
      const steps: Array<[Theme, string, string]> = [
        ["next-norteui", "neutral-textLow", "neutral-surfaceHighlight"],
        ["next-norteui-dark", "neutral-textHigh", "primary-surface"],
        ["base", "neutral-textHigh", "primary-surface"],
      ];
      steps.forEach(([theme, text, hover]) => {
        rerender(tree(theme));
        const button = screen.getByRole("button");
        expect(textColorOf(screen.getByText(labelText))).toBe(text);
        expect(styleVar(button, "backgroundColor-hover")).toBe(color(hover));
      });
    });

    it.each<Theme>(allThemes)(
      "MenuButton AC-012: SHOULD keep the disabled appearance and ignore clicks under %s",
      async (theme) => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        const { unmount } = renderUnderTheme(theme, {
          disabled: true,
          onClick,
        });
        const check = async () => {
          const button = screen.getByRole("button");
          expect(textColorOf(screen.getByText(labelText))).toBe(
            "neutral-textDisabled"
          );
          expect(iconColorOf(button)).toBe("neutral-textDisabled");
          expect(styleVar(button, "backgroundColor-disabled")).toBe(
            color("neutral-surfaceDisabled")
          );
          expect(button.getAttribute("class")).toMatch(
            /cursor-not-allowed-disabled/
          );
          await user.click(button);
        };
        await check();
        unmount();
        renderUnderTheme(theme, { disabled: true, active: true, onClick });
        await check();
        expect(onClick).not.toHaveBeenCalled();
      }
    );

    it.each([true, false])(
      "MenuButton AC-013: SHOULD keep padding, radius, row height and icon size in all six themes (expanded: %s)",
      (expanded) => {
        const signatures = allThemes.map((theme) => {
          const { unmount } = renderUnderTheme(theme, {
            expanded,
            showPopoversWhenCollapsed: false,
          });
          const button = screen.getByRole("button");
          const svg = button.querySelector("svg");
          const signature = `${layoutOf(button)}|${svg?.getAttribute(
            "width"
          )}x${svg?.getAttribute("height")}`;
          unmount();
          return signature;
        });
        expect(signatures[0]).toMatch(/16x16$/);
        signatures.forEach((signature) =>
          expect(signature).toBe(signatures[0])
        );
      }
    );

    it.each<Theme>(["base", "next-norteui"])(
      "MenuButton AC-014: SHOULD be reachable with Tab and activated with Enter and Space under %s",
      async (theme) => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        renderUnderTheme(theme, { onClick });

        await user.tab();
        expect(screen.getByRole("button")).toHaveFocus();
        await user.keyboard("{Enter}");
        await user.keyboard(" ");
        expect(onClick).toHaveBeenCalledTimes(2);
      }
    );
  });
});
