import React from "react";
import { render, screen } from "@testing-library/react";

import { EmptyApp } from "./EmptyApp";
import { EmptyAppProps } from "./emptyApp.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<EmptyAppProps, "children">) => {
  render(
    <EmptyApp {...rest} data-testid="empty-app-element">
      {bodyChildren}
    </EmptyApp>
  );
};

describe("GIVEN <EmptyApp />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render children correctly", () => {
      makeSut({});
      expect(screen.getByText("Body content")).toBeDefined();
    });
  });
});
