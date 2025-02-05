import React from "react";
import { render, screen } from "@testing-library/react";

import { LandingScreenModule } from "./LandingScreenModule";
import { LandingScreenModuleProps } from "./landingScreenModule.types";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<LandingScreenModuleProps, "children">) => {
  render(<LandingScreenModule {...rest}>{bodyChildren}</LandingScreenModule>);
};

describe("GIVEN <LandingScreenModule />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render title and description correctly", () => {
      makeSut({ description: "description", title: "title" });

      expect(screen.getByText("title")).toBeDefined();
      expect(screen.getByText("description")).toBeDefined();
    });

    it("SHOULD render children correctly", () => {
      makeSut({ description: "description", title: "title" });
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });
});
