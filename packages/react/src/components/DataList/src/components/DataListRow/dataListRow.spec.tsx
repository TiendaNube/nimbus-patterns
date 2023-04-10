import React from "react";
import { render, screen } from "@testing-library/react";

import { DataListRow } from "./DataListRow";
import { DataListRowProps } from "./dataListRow.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<DataListRowProps, "children">) => {
  render(
    <DataListRow {...rest} data-testid="data-list-element">
      {bodyChildren}
    </DataListRow>
  );
};

describe("GIVEN <DataListRow />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render children correctly", () => {
      makeSut({});
      expect(screen.getByText("Body content")).toBeDefined();
    });
  });
});
