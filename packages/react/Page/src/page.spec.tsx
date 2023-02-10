import React from "react";
import { render, screen } from "@testing-library/react";

import { Page } from "./Page";
import { PageProps } from "./page.types";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<PageProps, "children">) => {
  render(
    <Page {...rest} data-testid="page-element">
      {bodyChildren}
    </Page>
  );
};

describe("GIVEN <Page />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });

    it("SHOULD render max width property correctly", () => {
      makeSut({ maxWidth: "1200px" });
      expect(screen.getByTestId("page-element").getAttribute("style")).toContain("1200px");
    });
  });
});
