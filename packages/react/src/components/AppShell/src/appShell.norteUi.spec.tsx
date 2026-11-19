import React, { useEffect, useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

/**
 * Outside the card layout the content sits in a `display: contents` wrapper
 * (kept so the tree never changes between layouts), which is layout-neutral.
 */
const expectLayoutNeutralWrapper = (element: Element, body: Element) => {
  const wrapper = element.parentElement as HTMLElement;
  expect(wrapper.parentElement).toBe(body);
  expect(wrapper.style.display).toBe("contents");
  expect(wrapper.className).toBe("");
};

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
      expectLayoutNeutralWrapper(handle, screen.getByTestId("body-element"));
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
      expectLayoutNeutralWrapper(screen.getByTestId("page-content"), body);
      expectLayoutNeutralWrapper(screen.getByTestId("chat-element"), body);
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
        expectLayoutNeutralWrapper(screen.getByTestId("page-content"), body);
        expectLayoutNeutralWrapper(screen.getByTestId("chat-element"), body);
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

  describe("WHEN the layout changes after mount", () => {
    const mountCounter = jest.fn();
    const StatefulPage = () => {
      const [value] = useState(() => Math.random());
      useEffect(() => {
        mountCounter();
      }, []);
      return <div data-testid="page-content">{value}</div>;
    };
    const ChatContent = () => {
      useEffect(() => {
        mountCounter("chat");
      }, []);
      return <span>Chat</span>;
    };
    const renderShell = (withMenu: boolean) => (
      <AppShell menu={withMenu ? <div>Menu</div> : undefined}>
        <AppShell.Body data-testid="body-element">
          <StatefulPage />
          <AppShell.Chat data-testid="chat-element">
            <ChatContent />
          </AppShell.Chat>
        </AppShell.Body>
      </AppShell>
    );

    beforeEach(() => mountCounter.mockClear());

    it("SHOULD mount the chat content only once under Norte UI", () => {
      setTheme("next-norteui");
      render(renderShell(true));
      expect(
        mountCounter.mock.calls.filter(([kind]) => kind === "chat")
      ).toHaveLength(1);
    });

    it("SHOULD keep the page state when the theme switches to and from Norte UI", () => {
      setTheme("base");
      const { rerender } = render(renderShell(true));
      const initial = screen.getByTestId("page-content").textContent;
      setTheme("next-norteui");
      rerender(renderShell(true));
      setTheme("base");
      rerender(renderShell(true));
      expect(screen.getByTestId("page-content").textContent).toBe(initial);
      expect(
        mountCounter.mock.calls.filter(([kind]) => kind !== "chat")
      ).toHaveLength(1);
    });

    it("SHOULD keep the page state when the menu is added or removed", () => {
      setTheme("next-norteui");
      const { rerender } = render(renderShell(false));
      const initial = screen.getByTestId("page-content").textContent;
      rerender(renderShell(true));
      rerender(renderShell(false));
      expect(screen.getByTestId("page-content").textContent).toBe(initial);
      expect(
        mountCounter.mock.calls.filter(([kind]) => kind !== "chat")
      ).toHaveLength(1);
    });
  });

  describe("WHEN AppShell.Body receives onScroll", () => {
    const renderWithScroll = (onScroll: jest.Mock) =>
      render(
        <AppShell menu={<div>Menu</div>}>
          <AppShell.Body data-testid="body-element" onScroll={onScroll}>
            <div data-testid="page-content">Page</div>
          </AppShell.Body>
        </AppShell>
      );

    it("SHOULD call it when the content card scrolls under Norte UI", () => {
      setTheme("next-norteui");
      const onScroll = jest.fn();
      renderWithScroll(onScroll);
      fireEvent.scroll(getContentCard() as HTMLElement);
      expect(onScroll).toHaveBeenCalledTimes(1);
      fireEvent.scroll(screen.getByTestId("body-element"));
      expect(onScroll).toHaveBeenCalledTimes(1);
    });

    it("SHOULD call it when the body scrolls in other themes", () => {
      setTheme("base");
      const onScroll = jest.fn();
      renderWithScroll(onScroll);
      fireEvent.scroll(screen.getByTestId("body-element"));
      expect(onScroll).toHaveBeenCalledTimes(1);
    });
  });

  describe("WHEN AppShell.Chat is expanded outside the card layout", () => {
    const rects: Record<string, { left: number; top: number }> = {
      "body-element": { left: 240, top: 56 },
      "chat-wrapper": { left: 300, top: 80 },
    };

    beforeEach(() => {
      setTheme("base");
      jest
        .spyOn(HTMLElement.prototype, "getBoundingClientRect")
        .mockImplementation(function getRect(this: HTMLElement) {
          const rect = rects[this.dataset.testid ?? ""] ?? {
            left: 0,
            top: 0,
          };
          return { ...rect, width: 0, height: 0 } as DOMRect;
        });
    });

    afterEach(() => jest.restoreAllMocks());

    const expectOverlayOffsets = async (left: number, top: number) => {
      const getStyle = () =>
        screen.getByTestId("chat-element").getAttribute("style") ?? "";
      expect(getStyle()).toContain(`calc(100vh - ${top}px)`);
      expect(getStyle()).toContain(`${top}px;`);
      await waitFor(() =>
        expect(getStyle()).toContain(`calc(100% - ${left}px)`)
      );
    };

    it("SHOULD measure AppShell.Body, not the display: contents wrapper", async () => {
      render(
        <AppShell menu={<div>Menu</div>}>
          <AppShell.Body data-testid="body-element">
            <div>Page</div>
            <AppShell.Chat data-testid="chat-element" expanded>
              Chat
            </AppShell.Chat>
          </AppShell.Body>
        </AppShell>
      );
      await expectOverlayOffsets(240, 56);
    });

    it("SHOULD measure the consumer wrapper when the chat is nested", async () => {
      render(
        <AppShell menu={<div>Menu</div>}>
          <AppShell.Body data-testid="body-element">
            <div>Page</div>
            <div data-testid="chat-wrapper">
              <AppShell.Chat data-testid="chat-element" expanded>
                Chat
              </AppShell.Chat>
            </div>
          </AppShell.Body>
        </AppShell>
      );
      await expectOverlayOffsets(300, 80);
    });
  });

  describe("WHEN AppShell.Body receives a ref", () => {
    const renderWithRef = (ref: React.RefObject<HTMLDivElement | null>) =>
      render(
        <AppShell menu={<div>Menu</div>}>
          <AppShell.Body ref={ref} data-testid="body-element">
            <div data-testid="page-content">Page</div>
            <AppShell.Chat data-testid="chat-element">Chat</AppShell.Chat>
          </AppShell.Body>
        </AppShell>
      );

    it.each(["base", "next-norteui"])(
      "SHOULD forward the ref to the body element under %s",
      (theme) => {
        setTheme(theme);
        const ref = React.createRef<HTMLDivElement>();
        renderWithRef(ref);
        expect(ref.current).toBe(screen.getByTestId("body-element"));
      }
    );

    it("SHOULD keep the internal ref working under Norte UI", () => {
      setTheme("next-norteui");
      renderWithRef(React.createRef<HTMLDivElement>());
      const chat = screen.getByTestId("chat-element");
      // The chat is still portaled into the slot next to the card.
      expect(getContentCard()?.contains(chat)).toBe(false);
      expect(screen.getByTestId("body-element").contains(chat)).toBe(true);
    });
  });
});
