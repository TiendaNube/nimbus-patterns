import React from "react";
import { render, screen } from "@testing-library/react";

import { DataTableBulkActions } from "./DataTableBulkActions";
import { DataTableBulkActionsProps } from "./dataTableBulkActions.types";

const labelContent = "Label content";
const actionContent = "Action content";
const linkElement = <a href="#">Link content</a>;

const makeSut = (rest: Omit<DataTableBulkActionsProps, "checkbox" | "action" | "label">) => {
  render(
    <DataTableBulkActions
      {...rest}
      data-testid="bulk-actions-element"
      label={labelContent}
      action={actionContent}
      checkbox={{ name: "checkbox-element" }}
    />
  );
};

describe("GIVEN <DataTableBulkActions />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the label correctly", () => {
      makeSut({});
      expect(screen.getByText(labelContent)).toBeDefined();
    });

    it("THEN should render the action correctly", () => {
      makeSut({});
      expect(screen.getByText(actionContent)).toBeDefined();
    });

    it("THEN should render the checkbox element correctly", () => {
      makeSut({});
      expect(screen.getByRole("checkbox")).toBeDefined();
    });

    it("THEN should render the link element correctly", () => {
      makeSut({ link: linkElement });
      expect(screen.getByRole("link")).toBeDefined();
    });
  });
});
