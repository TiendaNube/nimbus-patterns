import React from "react";
import { render, screen } from "@testing-library/react";

import { LandingScreenSection } from "./LandingScreenSection";
import { LandingScreenSectionProps } from "./landingScreenSection.types";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<LandingScreenSectionProps, "children">) => {
  render(<LandingScreenSection {...rest}>{bodyChildren}</LandingScreenSection>);
};

describe("GIVEN <LandingScreenSection />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render title and children correctly", () => {
      makeSut({ title: "title" });

      expect(screen.getByText("title")).toBeDefined();
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });
});
