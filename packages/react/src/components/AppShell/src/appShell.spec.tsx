import React from "react";
import { render, screen } from "@testing-library/react";

import { AppShell } from "./AppShell";
import { AppShellProps } from "./appShell.types";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<AppShellProps, "children">) => {
  render(
    <AppShell {...rest} data-testid="app-shell-element">
      {bodyChildren}
    </AppShell>
  );
};

describe("GIVEN <AppShell />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render children correctly", () => {
      makeSut({});
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });
});
