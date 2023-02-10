import React from "react";
import { render, screen } from "@testing-library/react";

import { MenuBody } from "./MenuBody";
import { MenuBodyProps } from "./menuBody.types";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<MenuBodyProps, "children">) => {
  render(
    <MenuBody {...rest} data-testid="body-element">
      {bodyChildren}
    </MenuBody>
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
