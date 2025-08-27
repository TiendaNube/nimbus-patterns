import React from "react";
import { render, screen } from "@testing-library/react";

import { MenuBody } from "./MenuBody";
import { MenuBodyProps } from "./menuBody.types";
import { MenuExpandContext } from "@common/contexts";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<MenuBodyProps, "children">) => {
  render(
    <MenuExpandContext.Provider value={{ expanded: true }}>
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
  });
});
