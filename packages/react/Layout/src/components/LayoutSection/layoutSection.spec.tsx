import React from "react";
import { render, screen } from "@testing-library/react";

import { LayoutSection } from "./LayoutSection";
import { LayoutSectionProps } from "./layoutSection.types";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<LayoutSectionProps, "children">) => {
  render(
    <LayoutSection {...rest} data-testid="layout-element">
      {bodyChildren}
    </LayoutSection>
  );
};

describe("GIVEN <LayoutSection />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });
});
