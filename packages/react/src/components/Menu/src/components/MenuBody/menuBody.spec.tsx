import React from "react";
import { render, screen } from "@testing-library/react";

import { MenuExpandContext } from "@common/contexts";
import { noop } from "@common/utils";
import { MenuBody } from "./MenuBody";
import { MenuBodyProps } from "./menuBody.types";

const bodyChildren = "Body content";

const makeSut = (
  rest: Omit<MenuBodyProps, "children">,
  contextExpanded = true
) => {
  render(
    <MenuExpandContext.Provider
      value={{
        expanded: contextExpanded,
        activeAccordionPopover: null,
        setActiveAccordionPopover: noop,
      }}
    >
      <MenuBody {...rest} data-testid="body-element">
        {bodyChildren}
      </MenuBody>
    </MenuExpandContext.Provider>
  );
};

describe("GIVEN <MenuBody />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });

    it("SHOULD render children when collapsed", () => {
      makeSut({}, false);
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });
});
