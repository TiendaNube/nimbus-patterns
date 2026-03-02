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
  });
});
