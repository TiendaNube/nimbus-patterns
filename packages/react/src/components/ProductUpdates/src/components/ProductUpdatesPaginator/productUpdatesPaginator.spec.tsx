import React from "react";
import { render, screen } from "@testing-library/react";

import { ProductUpdatesPaginator } from "./ProductUpdatesPaginator";
import { ProductUpdatesPaginatorProps } from "./productUpdatesPaginator.types";

const makeSut = (rest: ProductUpdatesPaginatorProps) => {
  render(<ProductUpdatesPaginator {...rest} data-testid="paginator-element" />);
};

describe("GIVEN <ProductUpdatesPaginator />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the correct number of dots", () => {
      makeSut({ totalItems: 3, activeIndex: 0 });
      const paginator = screen.getByTestId("paginator-element");
      expect(paginator.children.length).toBe(3);
    });

    it("SHOULD render the correct number of dots for different totals", () => {
      makeSut({ totalItems: 5, activeIndex: 2 });
      const paginator = screen.getByTestId("paginator-element");
      expect(paginator.children.length).toBe(5);
    });

    it("SHOULD announce the current step via aria-label", () => {
      makeSut({ totalItems: 5, activeIndex: 1 });
      expect(screen.getByRole("img", { name: "Step 2 of 5" })).toBeDefined();
    });

    it("SHOULD hide individual dots from assistive technology", () => {
      makeSut({ totalItems: 3, activeIndex: 0 });
      const paginator = screen.getByTestId("paginator-element");
      const dots = Array.from(paginator.children);
      dots.forEach((dot) => {
        expect(dot.getAttribute("aria-hidden")).toBe("true");
      });
    });
  });
});
