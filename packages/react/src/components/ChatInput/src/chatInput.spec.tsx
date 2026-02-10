import React from "react";
import { render, screen } from "@testing-library/react";

import { ChatInput } from "./ChatInput";

describe("GIVEN <ChatInput />", () => {
  it("SHOULD render Actions and Field", () => {
    render(
      <ChatInput>
        <ChatInput.Actions>
          <div>left</div>
          <div>right</div>
        </ChatInput.Actions>
        <ChatInput.Field id="chat-field" placeholder="Type..." />
      </ChatInput>
    );
    expect(screen.getByText("left")).toBeDefined();
    expect(screen.getByText("right")).toBeDefined();
    expect(screen.getByPlaceholderText("Type...")).toBeDefined();
  });

  it("SHOULD render Actions with custom layout props", () => {
    render(
      <ChatInput>
        <ChatInput.Actions
          justifyContent="flex-end"
          alignItems="flex-start"
          gap="2"
          data-testid="custom-actions"
        >
          <div>action1</div>
          <div>action2</div>
        </ChatInput.Actions>
      </ChatInput>
    );
    expect(screen.getByText("action1")).toBeDefined();
    expect(screen.getByText("action2")).toBeDefined();
    expect(screen.getByTestId("custom-actions")).toBeDefined();
  });
});
