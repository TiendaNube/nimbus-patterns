import React from "react";
import { render, screen } from "@testing-library/react";

import { DataTableFooter } from "./DataTableFooter";
import { DataTableFooterProps } from "./dataTableFooter.types";

const itemCountContent = "Item count content";
const dummyFunction = jest.fn();

const makeSut = (rest: Omit<DataTableFooterProps, "itemCount">) => {
  render(
    <DataTableFooter
      {...rest}
      data-testid="footer-element"
      itemCount={itemCountContent}
    />
  );
};

describe("GIVEN <DataTableFooter />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the itemCount correctly", () => {
      makeSut({});
      expect(screen.getByText(itemCountContent)).toBeDefined();
    });

    it("THEN should render the pagination element correctly", () => {
      makeSut({
        pagination: {
          activePage: 1,
          pageCount: 2,
          onPageChange: dummyFunction,
        },
      });
      expect(screen.getByRole("list")).toBeDefined();
    });
  });
});
