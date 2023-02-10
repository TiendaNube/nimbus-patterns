import React from "react";
import { render, screen } from "@testing-library/react";

import { MenuHeader } from "./MenuHeader";
import { MenuHeaderProps } from "./menuHeader.types";

const headerChildren = "Header content";

const makeSut = (rest: Omit<MenuHeaderProps, "children">) => {
  render(
    <MenuHeader {...rest} data-testid="header-element">
      {headerChildren}
    </MenuHeader>
  );
};

describe("GIVEN <MenuHeader />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText(headerChildren)).toBeDefined();
    });
  });
});
