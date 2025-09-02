import React from "react";
import { render, screen } from "@testing-library/react";

import { MenuExpandContext } from "@common/contexts";
import { MenuHeader } from "./MenuHeader";
import { MenuHeaderProps } from "./menuHeader.types";

const headerChildren = "Header content";

const makeSut = (rest: Omit<MenuHeaderProps, "children">) => {
  render(
    <MenuExpandContext.Provider value={{ expanded: true }}>
      <MenuHeader {...rest} data-testid="header-element">
        {headerChildren}
      </MenuHeader>
    </MenuExpandContext.Provider>
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
