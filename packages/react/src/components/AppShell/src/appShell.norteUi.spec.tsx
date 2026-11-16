import React from "react";
import { render, screen } from "@testing-library/react";
import { useTheme } from "@nimbus-ds/styles";

import { AppShell } from "./AppShell";

jest.mock("@nimbus-ds/styles", () => ({
  ...jest.requireActual("@nimbus-ds/styles"),
  useTheme: jest.fn(),
}));

const mockedUseTheme = useTheme as jest.Mock;

const setTheme = (currentTheme: string) =>
  mockedUseTheme.mockReturnValue({ currentTheme, changeTheme: jest.fn() });

const tokensOf = (element: Element | null | undefined) =>
  `${element?.className ?? ""} ${element?.getAttribute("style") ?? ""}`;

const renderAppShell = () =>
  render(
    <AppShell
      menu={<div data-testid="menu-content">Menu</div>}
      data-testid="app-shell-element"
    >
      <AppShell.Header data-testid="header-element" rightSlot="Actions" />
      <AppShell.Body data-testid="body-element">
        <div data-testid="page-content">Page</div>
        <AppShell.Chat data-testid="chat-element">Chat</AppShell.Chat>
      </AppShell.Body>
    </AppShell>
  );

const getMenuWrapper = () => screen.getByTestId("menu-content").parentElement;

const getContentCard = () => screen.getByTestId("page-content").parentElement;

describe("GIVEN <AppShell /> under each theme", () => {
  afterEach(() => mockedUseTheme.mockReset());

  describe.each(["next-norteui", "next-norteui-dark"])(
    "WHEN the theme is %s",
    (theme) => {
      beforeEach(() => setTheme(theme));

      it("SHOULD remove the menu right border", () => {
        renderAppShell();
        expect(tokensOf(getMenuWrapper())).not.toContain(
          "nimbus-shape-border-width-1"
        );
      });

      it("SHOULD paint the shell and header with neutral-surfaceDisabled", () => {
        renderAppShell();
        expect(tokensOf(screen.getByTestId("header-element"))).toContain(
          "neutral-surfaceDisabled"
        );
        expect(tokensOf(screen.getByTestId("body-element"))).toContain(
          "neutral-surfaceDisabled"
        );
      });

      it("SHOULD wrap the page content in a rounded content card", () => {
        renderAppShell();
        const card = getContentCard();
        expect(card).not.toBe(screen.getByTestId("body-element"));
        expect(card?.parentElement).toBe(screen.getByTestId("body-element"));
        expect(tokensOf(card)).toContain("neutral-background");
        expect(tokensOf(card)).toContain("nimbus-shape-border-radius-3");
        expect(tokensOf(card)).toContain("overflow-auto");
      });

      it("SHOULD render AppShell.Chat as a sibling card outside the content card", () => {
        renderAppShell();
        const chat = screen.getByTestId("chat-element");
        expect(getContentCard()?.contains(chat)).toBe(false);
        // Portaled into a `display: contents` slot next to the card.
        expect(chat.parentElement?.parentElement).toBe(
          screen.getByTestId("body-element")
        );
        expect(tokensOf(chat)).toContain("nimbus-shape-border-radius-3");
        expect(tokensOf(chat)).not.toContain("nimbus-spacing-2");
      });
    }
  );

  describe("WHEN AppShell.Chat is nested inside a consumer wrapper", () => {
    beforeEach(() => setTheme("next-norteui"));

    it("SHOULD still render the chat outside the content card", () => {
      const ChatWrapper = () => (
        <div data-testid="chat-wrapper">
          <AppShell.Chat data-testid="nested-chat">Chat</AppShell.Chat>
        </div>
      );
      render(
        <AppShell menu={<div>Menu</div>}>
          <AppShell.Body data-testid="body-element">
            <div data-testid="page-content">Page</div>
            <ChatWrapper />
          </AppShell.Body>
        </AppShell>
      );
      const chat = screen.getByTestId("nested-chat");
      expect(screen.getByTestId("chat-wrapper").contains(chat)).toBe(false);
      expect(getContentCard()?.contains(chat)).toBe(false);
      expect(screen.getByTestId("body-element").contains(chat)).toBe(true);
    });
  });

  describe("WHEN AppShell.Chat receives a resizeHandle", () => {
    const renderWithHandle = () =>
      render(
        <AppShell menu={<div>Menu</div>}>
          <AppShell.Body data-testid="body-element">
            <div data-testid="page-content">Page</div>
            <AppShell.Chat
              data-testid="chat-element"
              resizeHandle={<div data-testid="resize-handle" />}
            >
              Chat
            </AppShell.Chat>
          </AppShell.Body>
        </AppShell>
      );

    it("SHOULD place the handle in the gap outside the content card under Norte UI", () => {
      setTheme("next-norteui");
      renderWithHandle();
      const handle = screen.getByTestId("resize-handle");
      const chat = screen.getByTestId("chat-element");
      expect(getContentCard()?.contains(handle)).toBe(false);
      expect(screen.getByTestId("body-element").contains(handle)).toBe(true);
      expect(handle.parentElement?.nextElementSibling).toBe(chat);
    });

    it("SHOULD render the handle inline right before the chat in other themes", () => {
      setTheme("base");
      renderWithHandle();
      const handle = screen.getByTestId("resize-handle");
      expect(handle.parentElement).toBe(screen.getByTestId("body-element"));
      expect(handle.nextElementSibling).toBe(
        screen.getByTestId("chat-element")
      );
    });
  });

  describe("WHEN the theme is next-norteui and there is no menu", () => {
    beforeEach(() => setTheme("next-norteui"));

    it("SHOULD not draw the content card nor portal the chat", () => {
      render(
        <AppShell>
          <AppShell.Body data-testid="body-element">
            <div data-testid="page-content">Page</div>
            <AppShell.Chat data-testid="chat-element">Chat</AppShell.Chat>
          </AppShell.Body>
        </AppShell>
      );
      const body = screen.getByTestId("body-element");
      expect(screen.getByTestId("page-content").parentElement).toBe(body);
      expect(screen.getByTestId("chat-element").parentElement).toBe(body);
      expect(tokensOf(body)).toContain("neutral-background");
      expect(tokensOf(body)).not.toContain("nimbus-shape-border-radius-3");
    });
  });

  describe.each(["base", "dark", "next", "next-dark"])(
    "WHEN the theme is %s",
    (theme) => {
      beforeEach(() => setTheme(theme));

      it("SHOULD keep the current layout without a content card", () => {
        renderAppShell();
        const body = screen.getByTestId("body-element");
        expect(screen.getByTestId("page-content").parentElement).toBe(body);
        expect(screen.getByTestId("chat-element").parentElement).toBe(body);
        expect(tokensOf(body)).toContain("neutral-surface");
        expect(tokensOf(body)).not.toContain("neutral-surfaceDisabled");
        expect(tokensOf(screen.getByTestId("header-element"))).not.toContain(
          "neutral-surfaceDisabled"
        );
        expect(tokensOf(getMenuWrapper())).toContain(
          "nimbus-shape-border-width-1"
        );
        expect(tokensOf(screen.getByTestId("chat-element"))).toContain(
          "nimbus-spacing-2"
        );
      });
    }
  );
});
