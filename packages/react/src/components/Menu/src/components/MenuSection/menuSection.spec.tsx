import React from "react";
import { render, screen } from "@testing-library/react";

import { MenuExpandContext } from "@common/contexts";
import { noop } from "@common/utils";
import { MenuSection } from "./MenuSection";
import { MenuSectionProps } from "./menuSection.types";

const sectionChildren = "Body content";
const sectionTitle = "Title content";

const makeSut = (
  rest: Omit<MenuSectionProps, "children">,
  expanded: boolean
) => {
  render(
    <MenuExpandContext.Provider
      value={{
        expanded,
        activeAccordionPopover: null,
        setActiveAccordionPopover: noop,
      }}
    >
      <MenuSection {...rest} data-testid="section-element">
        {sectionChildren}
      </MenuSection>
    </MenuExpandContext.Provider>
  );
};

describe("GIVEN <MenuSection />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly when expanded", () => {
      makeSut({}, true);
      expect(screen.getByText(sectionChildren)).toBeDefined();
    });

    it("SHOULD render title correctly when expanded", () => {
      makeSut({ title: sectionTitle }, true);
      expect(screen.getByText(sectionTitle)).toBeDefined();
    });

    it("SHOULD not render title when not expanded", () => {
      makeSut({ title: sectionTitle }, false);
      expect(screen.queryByText(sectionTitle)).toBeNull();
      expect(screen.getByTestId("menu-section--collapsed")).toBeDefined();
    });
  });
});
