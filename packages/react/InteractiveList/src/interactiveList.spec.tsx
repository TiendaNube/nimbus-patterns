import React from "react";
import { render, screen } from "@testing-library/react";

import { InteractiveList } from "./InteractiveList";
import { InteractiveListProps } from "./interactiveList.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<InteractiveListProps, "children">) => {
  render(
    <InteractiveList {...rest} data-testid="interactive-list-element">
      {bodyChildren}
    </InteractiveList>
  );
};

describe("GIVEN <InteractiveList />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render children correctly", () => {
      makeSut({});
      expect(screen.getByText("Body content")).toBeDefined();
    });
  });
});
