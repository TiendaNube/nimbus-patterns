import React from "react";
import { render, screen } from "@testing-library/react";

import { MenuSection } from "./MenuSection";
import { MenuSectionProps } from "./menuSection.types";

const sectionChildren = "Body content";
const sectionTitle = "Title content";

const makeSut = (rest: Omit<MenuSectionProps, "children">) => {
  render(
    <MenuSection {...rest} data-testid="section-element">
      {sectionChildren}
    </MenuSection>
  );
};

describe("GIVEN <MenuSection />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText(sectionChildren)).toBeDefined();
    });

    it("SHOULD render title correctly", () => {
      makeSut({ title: sectionTitle });
      expect(screen.getByText(sectionTitle)).toBeDefined();
    });
  });
});
