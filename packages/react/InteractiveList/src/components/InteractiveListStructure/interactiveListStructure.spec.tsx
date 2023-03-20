import React from "react";
import { screen, render } from "@testing-library/react";

import { InteractiveListStructure } from "./InteractiveListStructure";
import { InteractiveListStructureProps } from "./interactiveListStructure.types";

const listTitle = "Title element";

const makeSut = (rest: Omit<InteractiveListStructureProps, "title">) => {
  render(
    <InteractiveListStructure
      data-testid="interactive-list-element"
      title={listTitle}
      {...rest}
    />
  );
};

describe("GIVEN <InteractiveListStructure />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the title correctly", () => {
      makeSut({});
      expect(screen.getByText(listTitle)).toBeDefined();
    });

    it("THEN should render the title hidden", () => {
      makeSut({ showTitle: false });
      expect(screen.queryByText(listTitle)).toBeNull();
    });

    it("THEN should render the description correctly", () => {
      makeSut({ description: "Description element" });
      expect(screen.getByText("Description element")).toBeDefined();
    });

    it("THEN should render children correctly", () => {
      makeSut({ children: "Children element" });
      expect(screen.getByText("Children element")).toBeDefined();
    });
  });
});
