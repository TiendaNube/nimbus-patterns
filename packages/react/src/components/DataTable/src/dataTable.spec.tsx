import React from "react";
import { render, screen } from "@testing-library/react";

import { DataTable } from "./DataTable";
import { DataTableProps } from "./dataTable.types";

const headerChildren = (
  <thead>
    <tr>
      <th>Header content</th>
    </tr>
  </thead>
);
const bodyChildren = (
  <tr>
    <td>Body content</td>
  </tr>
);

const makeSut = (rest: Omit<DataTableProps, "header" | "children">) => {
  render(
    <DataTable
      {...rest}
      header={headerChildren}
      data-testid="data-table-element"
    >
      {bodyChildren}
    </DataTable>
  );
};

describe("GIVEN <DataTable />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render header correctly", () => {
      makeSut({});
      expect(screen.getByText("Header content")).toBeDefined();
    });

    it("THEN should render children correctly", () => {
      makeSut({});
      expect(screen.getByText("Body content")).toBeDefined();
    });

    it("THEN should render bulkActions correctly", () => {
      makeSut({ bulkActions: "Bulk actions content" });
      expect(screen.getByText("Bulk actions content")).toBeDefined();
    });

    it("THEN should render footer correctly", () => {
      makeSut({ bulkActions: "Footer content" });
      expect(screen.getByText("Footer content")).toBeDefined();
    });
  });
});
