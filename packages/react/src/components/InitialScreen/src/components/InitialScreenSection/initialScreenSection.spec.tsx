import React from "react";
import { render, screen } from "@testing-library/react";

import { InitialScreenSection } from "./InitialScreenSection";
import { InitialScreenSectionProps } from "./initialScreenSection.types";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<InitialScreenSectionProps, "children">) => {
  render(<InitialScreenSection {...rest}>{bodyChildren}</InitialScreenSection>);
};

describe("GIVEN <InitialScreenSection />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render title and children correctly", () => {
      makeSut({ title: "title" });

      expect(screen.getByText("title")).toBeDefined();
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });
});
