import React from "react";
import { render, screen } from "@testing-library/react";

import { InitialScreenModule } from "./InitialScreenModule";
import { InitialScreenModuleProps } from "./initialScreenModule.types";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<InitialScreenModuleProps, "children">) => {
  render(<InitialScreenModule {...rest}>{bodyChildren}</InitialScreenModule>);
};

describe("GIVEN <InitialScreenModule />", () => {
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
