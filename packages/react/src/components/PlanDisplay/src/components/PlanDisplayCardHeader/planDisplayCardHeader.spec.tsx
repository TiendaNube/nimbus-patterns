import React from "react";
import { render, screen } from "@testing-library/react";

import { Text } from "@nimbus-ds/components";
import { PlanDisplayCardHeader } from "./PlanDisplayCardHeader";
import { PlanDisplayCardHeaderProps } from "./planDisplayCardHeader.types";

const bodyChildren = <div>Body content</div>;

const makeSut = (rest: Omit<PlanDisplayCardHeaderProps, "children">) => {
  render(
    <PlanDisplayCardHeader {...rest}>{bodyChildren}</PlanDisplayCardHeader>
  );
};

describe("GIVEN <PlanDisplayCardHeader />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render title, subtitle and children correctly", () => {
      makeSut({
        subtitle: "Subtitle",
        title: <Text>Title</Text>,
      });
      expect(screen.getByText("Body content")).toBeDefined();

      expect(screen.getByText("Subtitle")).toBeDefined();
      expect(screen.getByText("Title")).toBeDefined();
    });
  });
});
