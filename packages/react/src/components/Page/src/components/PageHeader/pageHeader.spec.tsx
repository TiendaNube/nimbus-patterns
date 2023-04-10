import React from "react";
import { render, screen } from "@testing-library/react";

import { PageHeader } from "./PageHeader";
import { PageHeaderProps } from "./pageHeader.types";

const pageTitle = "Title";

const makeSut = (rest: Omit<PageHeaderProps, "title">) => {
  render(
    <PageHeader {...rest} title={pageTitle} data-testid="page-header-element" />
  );
};

describe("GIVEN <PageHeader />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the title correctly", () => {
      makeSut({});
      expect(screen.getByText(pageTitle)).toBeDefined();
    });

    it("SHOULD render the subtitle correctly", () => {
      makeSut({ subtitle: "Subtitle" });
      expect(screen.getByText("Subtitle")).toBeDefined();
    });

    it("SHOULD render button stack correctly", () => {
      makeSut({ buttonStack: "Button stack" });
      expect(screen.getByText("Button stack")).toBeDefined();
    });

    it("SHOULD render children correctly", () => {
      makeSut({ children: "Children text" });
      expect(screen.getByText("Children text")).toBeDefined();
    });
  });
});
