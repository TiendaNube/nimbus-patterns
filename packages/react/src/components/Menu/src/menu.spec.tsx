import React from "react";
import { render, screen } from "@testing-library/react";

import { Menu } from "./Menu";
import { MenuProps } from "./menu.types";

const bodyChildren = "Body content";

const makeSut = (rest?: Omit<MenuProps, "children">) => {
  render(
    <Menu {...rest} data-testid="menu-element">
      {bodyChildren}
    </Menu>
  );
};

describe("GIVEN <Menu />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut();
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });
});
