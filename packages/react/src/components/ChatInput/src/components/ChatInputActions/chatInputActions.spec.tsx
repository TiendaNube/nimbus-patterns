import React from "react";
import { render, screen } from "@testing-library/react";

import { ChatInput } from "../../ChatInput";
import { ChatInputActionsProps } from "./chatInputActions.types";

const makeSut = (rest?: Partial<ChatInputActionsProps>) => {
  render(
    <ChatInput.Actions {...rest} data-testid="chat-input-actions">
      <span>Action Content</span>
    </ChatInput.Actions>
  );
};

describe("GIVEN <ChatInputActions />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the actions container correctly", () => {
      makeSut();
      expect(screen.getByTestId("chat-input-actions")).toBeDefined();
    });

    it("SHOULD render children content", () => {
      makeSut();
      expect(screen.getByText("Action Content")).toBeDefined();
    });

    it("SHOULD have Box component as container", () => {
      makeSut();
      const element = screen.getByTestId("chat-input-actions");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-testid", "chat-input-actions");
    });
  });

  describe("WHEN custom props are passed", () => {
    it("SHOULD pass through additional props", () => {
      makeSut({ "aria-label": "Chat actions" });
      expect(screen.getByLabelText("Chat actions")).toBeDefined();
    });
  });
});
