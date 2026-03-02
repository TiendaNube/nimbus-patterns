import React from "react";
import { render, screen } from "@testing-library/react";

import { ProductUpdatesFooter } from "./ProductUpdatesFooter";
import { ProductUpdatesFooterProps } from "./productUpdatesFooter.types";

const makeSut = (rest: ProductUpdatesFooterProps = {}) => {
  render(<ProductUpdatesFooter {...rest} data-testid="footer-element" />);
};

describe("GIVEN <ProductUpdatesFooter />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the back link when provided", () => {
      makeSut({ leftLink: <span>Go back</span> });
      expect(screen.getByText("Go back")).toBeDefined();
    });

    it("SHOULD render the paginator when provided", () => {
      makeSut({ paginator: <span data-testid="paginator">Dots</span> });
      expect(screen.getByTestId("paginator")).toBeDefined();
    });

    it("SHOULD render the next button when provided", () => {
      makeSut({ rightButton: <button type="button">Next</button> });
      expect(screen.getByText("Next")).toBeDefined();
    });

    it("SHOULD render all slots together", () => {
      makeSut({
        leftLink: <span>Back</span>,
        paginator: <span>Dots</span>,
        rightButton: <button type="button">Next</button>,
      });
      expect(screen.getByText("Back")).toBeDefined();
      expect(screen.getByText("Dots")).toBeDefined();
      expect(screen.getByText("Next")).toBeDefined();
    });
  });
});
