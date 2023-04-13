import React from "react";
import { render, screen } from "@testing-library/react";

import { HelpLink } from "./HelpLink";
import { HelpLinkProps } from "./helpLink.types";

const linkChildren = "Body content";

const makeSut = (rest: HelpLinkProps) => {
  render(<HelpLink {...rest} data-testid="helpLink-element" />);
};

describe("GIVEN <HelpLink />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the link correctly", () => {
      makeSut({ link: { children: linkChildren } });
      expect(screen.getByText(linkChildren)).toBeDefined();
    });
  });
});
