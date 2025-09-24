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
});
