import React from "react";
import { render, screen } from "@testing-library/react";

import { PageBody } from "./PageBody";
import { PageBodyProps } from "./pageBody.types";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<PageBodyProps, "children">) => {
  render(
    <PageBody {...rest} data-testid="page-body-element">
      {bodyChildren}
    </PageBody>
  );
};

describe("GIVEN <PageBody />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });
});
