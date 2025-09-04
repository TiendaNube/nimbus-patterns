import React from "react";
import { render, screen } from "@testing-library/react";

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
});
