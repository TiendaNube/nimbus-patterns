import React from "react";
import { render, screen } from "@testing-library/react";

import { HelpLink } from "./HelpLink";
import { HelpLinkProps } from "./helpLink.types";

const linkChildren = "Body content";

const makeSut = (rest: HelpLinkProps) => {
  render(<HelpLink {...rest} data-testid="helpLink-element" />);
};

const getIconContainer = () => {
  const icon = screen.getByTestId("helpLink-element").querySelector("svg");
  return icon?.parentElement?.parentElement as HTMLElement;
};

describe("GIVEN <HelpLink />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the link correctly", () => {
      makeSut({ children: linkChildren });
      expect(screen.getByText(linkChildren)).toBeDefined();
    });

    it("SHOULD render the icon container with the neutral-surfaceDisabled background", () => {
      makeSut({ children: linkChildren });
      expect(getIconContainer().getAttribute("style")).toContain(
        "var(--nimbus-colors-neutral-surfaceDisabled)"
      );
    });

    it("SHOULD render the question icon with the neutral-textLow color", () => {
      makeSut({ children: linkChildren });
      const iconWrapper = screen
        .getByTestId("helpLink-element")
        .querySelector("svg")?.parentElement;
      expect(iconWrapper?.className).toContain("color_neutral-textLow");
    });
  });
});
