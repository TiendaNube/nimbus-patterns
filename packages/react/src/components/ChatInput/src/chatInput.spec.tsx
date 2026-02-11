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

  it("SHOULD render Actions without extra padding", () => {
    render(
      <ChatInput>
        <ChatInput.Actions data-testid="actions-bar">
          <div>left</div>
          <div>right</div>
        </ChatInput.Actions>
      </ChatInput>
    );
    const actionsEl = screen.getByTestId("actions-bar");
    expect(actionsEl).toBeDefined();

    // Verify no padding classes are applied (pb="none", px="none")
    const classes = actionsEl.getAttribute("class") ?? "";
    expect(classes).not.toContain("paddingBottom-2");
    expect(classes).not.toContain("paddingLeft-1");
  });
});
