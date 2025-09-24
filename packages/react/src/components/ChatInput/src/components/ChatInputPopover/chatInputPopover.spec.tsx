import React from "react";
import { render, screen } from "@testing-library/react";
import { Box } from "@nimbus-ds/components";

import { ChatInput } from "../../ChatInput";
import { ChatInputPopoverProps } from "./chatInputPopover.types";

const makeSut = (rest?: Partial<ChatInputPopoverProps>) => {
  render(
    <ChatInput.Popover
      content={<div>Test Content</div>}
      {...rest}
      data-testid="chat-input-popover"
    >
      <button type="button">Trigger Button</button>
    </ChatInput.Popover>
  );
};

describe("GIVEN <ChatInputPopover />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the popover trigger correctly", () => {
      makeSut();
      expect(screen.getByText("Trigger Button")).toBeDefined();
    });

    it("SHOULD pass through children content", () => {
      makeSut();
      expect(screen.getByText("Trigger Button")).toBeInTheDocument();
    });

    it("SHOULD have proper displayName", () => {
      expect(ChatInput.Popover.displayName).toBe("ChatInput.Popover");
    });
  });

  describe("WHEN custom content is provided", () => {
    it("SHOULD render complex content", () => {
      render(
        <ChatInput.Popover
          content={
            <Box>
              <span>Complex Content</span>
            </Box>
          }
          data-testid="chat-input-popover"
        >
          <button type="button">Trigger</button>
        </ChatInput.Popover>
      );

      expect(screen.getByText("Trigger")).toBeDefined();
    });
  });

  describe("WHEN different custom content is provided", () => {
    it("SHOULD accept different content", () => {
      render(
        <ChatInput.Popover
          content={<span data-testid="custom-content">Custom Content</span>}
          data-testid="chat-input-popover"
        >
          <button type="button">Trigger Button</button>
        </ChatInput.Popover>
      );
      expect(screen.getByText("Trigger Button")).toBeDefined();
    });
  });
});
