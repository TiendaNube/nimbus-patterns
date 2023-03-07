import React from "react";
import { render, screen } from "@testing-library/react";

import { DataTableRow } from "./DataTableRow";
import { DataTableRowProps } from "./dataTableRow.types";

const childrenContent = <td>Children content</td>;

const makeSut = (rest: Omit<DataTableRowProps, "checkbox" | "children">) => {
  render(
    <table>
      <tbody>
        <DataTableRow
          {...rest}
          data-testid="row-element"
          checkbox={{ name: "checkbox" }}
        >
          {childrenContent}
        </DataTableRow>
      </tbody>
    </table>
  );
};

describe("GIVEN <DataTableRow />", () => {
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
