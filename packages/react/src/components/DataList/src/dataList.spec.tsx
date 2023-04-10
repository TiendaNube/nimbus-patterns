import React from "react";
import { render, screen } from "@testing-library/react";

import { DataList } from "./DataList";
import { DataListProps } from "./dataList.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<DataListProps, "children">) => {
  render(
    <DataList {...rest} data-testid="data-list-element">
      {bodyChildren}
    </DataList>
  );
};

describe("GIVEN <DataList />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render children correctly", () => {
      makeSut({});
      expect(screen.getByText("Body content")).toBeDefined();
    });
  });
});
