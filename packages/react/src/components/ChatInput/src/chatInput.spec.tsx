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

  it("SHOULD render Actions with custom layout props forwarded to Box", () => {
    render(
      <ChatInput>
        <ChatInput.Actions
          justifyContent="flex-end"
          alignItems="flex-start"
          gap="2"
          pb="1"
          px="2"
          data-testid="custom-actions"
        >
          <div>action1</div>
          <div>action2</div>
        </ChatInput.Actions>
      </ChatInput>
    );
    const actionsEl = screen.getByTestId("custom-actions");
    expect(actionsEl).toBeDefined();
    expect(screen.getByText("action1")).toBeDefined();
    expect(screen.getByText("action2")).toBeDefined();

    // Verify custom layout props generate the expected atomic CSS classes
    const classes = actionsEl.getAttribute("class") ?? "";
    expect(classes).toContain("justifyContent");
    expect(classes).toContain("alignItems");
    expect(classes).toContain("gap");
    expect(classes).toContain("paddingBottom");
    expect(classes).toContain("paddingLeft");
  });
});
