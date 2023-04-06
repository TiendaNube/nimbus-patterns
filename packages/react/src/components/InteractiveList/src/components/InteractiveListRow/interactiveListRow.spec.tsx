import React from "react";
import { render, screen } from "@testing-library/react";

import { InteractiveListRow } from "./InteractiveListRow";
import { InteractiveListRowProps } from "./interactiveListRow.types";

const rowChildren = <div>Row content</div>;

const makeSut = (rest: Omit<InteractiveListRowProps, "children">) => {
  render(
    <InteractiveListRow {...rest} data-testid="interactive-list-element">
      {rowChildren}
    </InteractiveListRow>
  );
};

describe("GIVEN <InteractiveListRow />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render children correctly", () => {
      makeSut({});
      expect(screen.getByText("Row content")).toBeDefined();
    });
  });
});
