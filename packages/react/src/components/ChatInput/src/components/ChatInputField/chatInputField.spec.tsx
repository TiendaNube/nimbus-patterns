import React from "react";
import { render, screen } from "@testing-library/react";

import { ChatInput } from "../../ChatInput";
import { ChatInputFieldBaseProps } from "./chatInputField.types";

const makeSut = (rest?: Partial<ChatInputFieldBaseProps>) => {
  render(
    <ChatInput.Field
      {...rest}
      id="test-field"
      data-testid="chat-input-field"
      placeholder="Test placeholder"
    />
  );
};

describe("GIVEN <ChatInputField />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the textarea element correctly", () => {
      makeSut();
      expect(screen.getByRole("textbox")).toBeDefined();
    });

    it("SHOULD render with placeholder text", () => {
      makeSut();
      expect(screen.getByPlaceholderText("Test placeholder")).toBeDefined();
    });

    it("SHOULD have default lines property", () => {
      makeSut();
      const element = screen.getByRole("textbox");
      expect(element.getAttribute("rows")).toBe("1");
    });
  });

  describe("WHEN appearance is set", () => {
    it("SHOULD handle ai-generative appearance", () => {
      makeSut({ appearance: "ai-generative" });
      expect(screen.getByRole("textbox")).toBeDefined();
    });

    it("SHOULD handle danger appearance", () => {
      makeSut({ appearance: "danger" });
      expect(screen.getByRole("textbox")).toBeDefined();
    });

    it("SHOULD handle warning appearance", () => {
      makeSut({ appearance: "warning" });
      expect(screen.getByRole("textbox")).toBeDefined();
    });

    it("SHOULD handle success appearance", () => {
      makeSut({ appearance: "success" });
      expect(screen.getByRole("textbox")).toBeDefined();
    });

    it("SHOULD handle none appearance", () => {
      makeSut({ appearance: "none" });
      expect(screen.getByRole("textbox")).toBeDefined();
    });
  });

  describe("WHEN lines prop is set", () => {
    it("SHOULD set correct number of lines", () => {
      makeSut({ lines: 5 });
      const element = screen.getByRole("textbox");
      expect(element.getAttribute("rows")).toBe("5");
    });

    it("SHOULD handle single line", () => {
      makeSut({ lines: 1 });
      const element = screen.getByRole("textbox");
      expect(element.getAttribute("rows")).toBe("1");
    });
  });

  describe("WHEN custom props are passed", () => {
    it("SHOULD pass through additional props", () => {
      makeSut({ "aria-label": "Chat input field" });
      expect(screen.getByLabelText("Chat input field")).toBeDefined();
    });
  });
});
