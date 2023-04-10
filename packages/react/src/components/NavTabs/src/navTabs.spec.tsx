import React from "react";
import { render, screen } from "@testing-library/react";

import { NavTabs } from "./NavTabs";
import { NavTabsProps } from "./navTabs.types";

const childrenContent = "Children content";

const makeSut = (rest: Omit<NavTabsProps, "children">) => {
  render(
    <NavTabs {...rest} data-testid="nav-tabs-element">
      {childrenContent}
    </NavTabs>
  );
};

describe("GIVEN <NavTabs />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the children correctly", () => {
      makeSut({});
      expect(screen.getByText(childrenContent)).toBeDefined();
    });
  });
});
