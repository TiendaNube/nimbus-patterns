import React from "react";
import { render, screen } from "@testing-library/react";

import { Layout } from "./Layout";
import { LayoutProps } from "./layout.types";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<LayoutProps, "children">) => {
  render(
    <Layout {...rest} data-testid="layout-element">
      {bodyChildren}
    </Layout>
  );
};

describe("GIVEN <Layout />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });

    describe("SHOULD render the columns correctly", () => {
      it("SHOULD render the default number of columns", () => {
        makeSut({});
        expect(
          screen.getByTestId("layout-element").getAttribute("style")
        ).toContain("1fr");
      });

      it("SHOULD render 1 column correctly", () => {
        makeSut({ columns: "1" });
        expect(
          screen.getByTestId("layout-element").getAttribute("style")
        ).toContain("1fr");
      });

      it("SHOULD render 2 asymmetric columns correctly", () => {
        makeSut({ columns: "2 - asymmetric" });
        expect(
          screen.getByTestId("layout-element").getAttribute("style")
        ).toContain("2fr 1fr");
      });

      it("SHOULD render 2 symmetric columns correctly", () => {
        makeSut({ columns: "2 - symmetric" });
        expect(
          screen.getByTestId("layout-element").getAttribute("style")
        ).toContain("1fr 1fr");
      });

      it("SHOULD render 3 columns correctly", () => {
        makeSut({ columns: "3" });
        expect(
          screen.getByTestId("layout-element").getAttribute("style")
        ).toContain("1fr 1fr 1fr");
      });
    });
  });
});
