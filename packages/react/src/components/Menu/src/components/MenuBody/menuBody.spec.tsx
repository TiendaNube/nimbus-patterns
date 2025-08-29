import React from "react";
import { render, screen } from "@testing-library/react";

import { MenuExpandContext } from "@common/contexts";
import { MenuBody } from "./MenuBody";
import { MenuBodyProps } from "./menuBody.types";

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
