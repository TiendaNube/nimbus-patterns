import React from "react";
import { render, screen, act } from "@testing-library/react";

import { AppShellChat } from "./AppShellChat";
import { AppShellChatProps } from "./AppShellChat.types";

const bodyChildren = "Chat content";

const makeSut = (rest: Omit<AppShellChatProps, "children">) => {
  render(
    <AppShellChat {...rest} data-testid="app-shell-chat-element">
      {bodyChildren}
    </AppShellChat>
  );
};

describe("GIVEN <AppShellChat />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });

  describe("WHEN expanded is false", () => {
    it("SHOULD render children inside the inline container", () => {
      makeSut({ expanded: false });
      const container = screen.getByTestId("app-shell-chat-element");
      expect(container).toBeDefined();
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });

  describe("WHEN expanded is true", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("SHOULD render children in the fullscreen overlay", () => {
      makeSut({ expanded: true });
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });

    it("SHOULD render the placeholder without children", () => {
      makeSut({ expanded: true });
      const placeholder = screen.getByTestId("app-shell-chat-element");
      expect(placeholder).toBeDefined();
      expect(placeholder.textContent).toBe("");
    });
  });

  describe("WHEN defaultExpanded is true", () => {
    it("SHOULD start with children in the fullscreen overlay", () => {
      makeSut({ defaultExpanded: true });
      const placeholder = screen.getByTestId("app-shell-chat-element");
      expect(placeholder.textContent).toBe("");
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });

  describe("WHEN expanded changes from true to false", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("SHOULD move children back to the inline container after transition", () => {
      const { rerender } = render(
        <AppShellChat expanded data-testid="app-shell-chat-element">
          {bodyChildren}
        </AppShellChat>
      );

      rerender(
        <AppShellChat expanded={false} data-testid="app-shell-chat-element">
          {bodyChildren}
        </AppShellChat>
      );

      act(() => {
        jest.advanceTimersByTime(300);
      });

      const container = screen.getByTestId("app-shell-chat-element");
      expect(container.textContent).toBe(bodyChildren);
    });
  });
});
