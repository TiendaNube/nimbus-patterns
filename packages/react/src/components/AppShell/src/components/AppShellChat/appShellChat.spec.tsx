import React, { useState } from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";

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

const StatefulInput: React.FC = () => {
  const [value, setValue] = useState("");
  return (
    <input
      data-testid="stateful-input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
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

    it("SHOULD render a spacer element for flex layout", () => {
      makeSut({ expanded: true });
      const container = screen.getByTestId("app-shell-chat-element");
      expect(container.parentElement?.children.length).toBeGreaterThanOrEqual(
        2
      );
    });
  });

  describe("WHEN defaultExpanded is true", () => {
    it("SHOULD start with children in the fullscreen overlay", () => {
      makeSut({ defaultExpanded: true });
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

    it("SHOULD preserve child component state across expand and collapse", () => {
      const { rerender } = render(
        <AppShellChat expanded={false} data-testid="app-shell-chat-element">
          <StatefulInput />
        </AppShellChat>
      );

      const input = screen.getByTestId("stateful-input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "draft message" } });
      expect(input.value).toBe("draft message");

      rerender(
        <AppShellChat expanded data-testid="app-shell-chat-element">
          <StatefulInput />
        </AppShellChat>
      );
      expect(
        (screen.getByTestId("stateful-input") as HTMLInputElement).value
      ).toBe("draft message");

      rerender(
        <AppShellChat expanded={false} data-testid="app-shell-chat-element">
          <StatefulInput />
        </AppShellChat>
      );

      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(
        (screen.getByTestId("stateful-input") as HTMLInputElement).value
      ).toBe("draft message");
    });
  });
});
