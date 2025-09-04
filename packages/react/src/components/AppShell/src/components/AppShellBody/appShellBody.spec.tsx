import React from "react";
import { render, screen } from "@testing-library/react";

import { AppShellBody } from "./AppShellBody";
import { AppShellBodyProps } from "./AppShellBody.types";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<AppShellBodyProps, "children">) => {
  render(
    <AppShellBody {...rest} data-testid="app-shell-body-element">
      {bodyChildren}
    </AppShellBody>
  );
};

describe("GIVEN <AppShellBody />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });
});
