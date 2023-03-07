import React from "react";
import { render, screen } from "@testing-library/react";

import { DataTableHeader } from "./DataTableHeader";
import { DataTableHeaderProps } from "./dataTableHeader.types";

const childrenContent = <th>Children content</th>;

const makeSut = (rest: Omit<DataTableHeaderProps, "checkbox" | "children">) => {
  render(
    <table>
      <DataTableHeader
        {...rest}
        data-testid="header-element"
        checkbox={{ name: "checkbox" }}
      >
        {childrenContent}
      </DataTableHeader>
    </table>
  );
};

describe("GIVEN <DataTableHeader />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the children correctly", () => {
      makeSut({});
      expect(screen.getByText("Children content")).toBeDefined();
    });

    it("THEN should render the checkbox element correctly", () => {
      makeSut({});
      expect(screen.getByRole("checkbox")).toBeDefined();
    });
  });
});
