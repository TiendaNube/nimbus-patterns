import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PlusCircleIcon } from "@nimbus-ds/icons";

import { ChatInput } from "../../ChatInput";
import { ChatInputPopoverButtonProps } from "./chatInputPopoverButton.types";

const makeSut = (rest?: Partial<ChatInputPopoverButtonProps>) => {
  render(
    <ChatInput.PopoverButton
      text="Test Button"
      {...rest}
      data-testid="chat-input-popover-button"
    />
  );
};

describe("GIVEN <ChatInputPopoverButton />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the button text correctly", () => {
      makeSut();
      expect(screen.getByText("Test Button")).toBeDefined();
    });

    it("SHOULD render as a button element", () => {
      makeSut();
      const element = screen.getByTestId("chat-input-popover-button");
      expect(element.tagName).toBe("BUTTON");
    });

    it("SHOULD have proper displayName", () => {
      expect(ChatInput.PopoverButton.displayName).toBe(
        "ChatInput.PopoverButton"
      );
    });
  });

  describe("WHEN icon is provided", () => {
    it("SHOULD render the icon", () => {
      makeSut({ icon: <PlusCircleIcon data-testid="test-icon" /> });
      expect(screen.getByTestId("test-icon")).toBeDefined();
    });

    it("SHOULD render text and icon together", () => {
      makeSut({
        icon: <PlusCircleIcon data-testid="test-icon" />,
        text: "Upload File",
      });
      expect(screen.getByText("Upload File")).toBeDefined();
      expect(screen.getByTestId("test-icon")).toBeDefined();
    });
  });

  describe("WHEN onClick handler is provided", () => {
    it("SHOULD call onClick when clicked", () => {
      const mockOnClick = jest.fn();
      makeSut({ onClick: mockOnClick });

      const button = screen.getByTestId("chat-input-popover-button");
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("SHOULD pass the event to onClick handler", () => {
      const mockOnClick = jest.fn();
      makeSut({ onClick: mockOnClick });

      const button = screen.getByTestId("chat-input-popover-button");
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe("WHEN custom props are passed", () => {
    it("SHOULD accept custom text", () => {
      makeSut({ text: "Custom Button Text" });
      expect(screen.getByText("Custom Button Text")).toBeDefined();
    });
  });
});
