import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { CalloutCard } from "./CalloutCard";
import { CalloutCardProps } from "./calloutCard.types";

const makeSut = (rest: CalloutCardProps) => {
  render(<CalloutCard {...rest} data-testid="callout-card-element" />);
};

describe("GIVEN <CalloutCard />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut({
        title: "My tittle",
        subtitle: "My subtitle",
        appearance: "primary",
        icon: () => <svg data-testid="icon-element" />,
      });
      expect(screen.getByText("My tittle")).toBeDefined();
      expect(screen.getByText("My subtitle")).toBeDefined();
      expect(screen.getByTestId("icon-element")).toBeDefined();
    });

    it("THEN should correctly render the submitted link", () => {
      makeSut({
        title: "My tittle",
        subtitle: "My subtitle",
        appearance: "primary",
        icon: () => <svg data-testid="icon-element" />,
        link: {
          children: "My link",
          href: "http://localhost:3000/",
        },
      });
      const link = screen.getByText<HTMLAnchorElement>("My link");
      expect(link).toBeDefined();
      expect(link.href).toEqual("http://localhost:3000/");
    });

    it("THEN should correctly render the submitted onClick", () => {
      const mockedOnClick = jest.fn();
      makeSut({
        title: "My tittle",
        subtitle: "My subtitle",
        appearance: "primary",
        onClick: mockedOnClick,
        icon: () => <svg data-testid="icon-element" />,
      });
      fireEvent.click(screen.getByTestId("callout-card-open-icon"));
      expect(mockedOnClick).toHaveBeenCalled();
    });
  });

  describe("THEN should correctly render the submitted appearance", () => {
    it("THEN should correctly render the appearance primary", () => {
      makeSut({
        title: "My tittle",
        subtitle: "My subtitle",
        appearance: "primary",
        icon: () => <svg data-testid="icon-element" />,
      });
      expect(
        screen.getByTestId("callout-card-element").getAttribute("class")
      ).toContain("primary.surfaceHighlight");
      expect(
        screen.getByTestId("callout-card-icon").getAttribute("class")
      ).toContain("primary.textLow");
      expect(
        screen.getByTestId("callout-card-title").getAttribute("class")
      ).toContain("primary.textLow");
      expect(
        screen.getByTestId("callout-card-subtitle").getAttribute("class")
      ).toContain("primary.textLow");
      expect(
        screen.getByTestId("callout-card-open-icon").getAttribute("class")
      ).toContain("primary.textLow");
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({
        title: "My tittle",
        subtitle: "My subtitle",
        appearance: "success",
        icon: () => <svg data-testid="icon-element" />,
      });
      expect(
        screen.getByTestId("callout-card-element").getAttribute("class")
      ).toContain("success.surfaceHighlight");
      expect(
        screen.getByTestId("callout-card-icon").getAttribute("class")
      ).toContain("success.textLow");
      expect(
        screen.getByTestId("callout-card-title").getAttribute("class")
      ).toContain("success.textLow");
      expect(
        screen.getByTestId("callout-card-subtitle").getAttribute("class")
      ).toContain("success.textLow");
      expect(
        screen.getByTestId("callout-card-open-icon").getAttribute("class")
      ).toContain("success.textLow");
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({
        title: "My tittle",
        subtitle: "My subtitle",
        appearance: "warning",
        icon: () => <svg data-testid="icon-element" />,
      });
      expect(
        screen.getByTestId("callout-card-element").getAttribute("class")
      ).toContain("warning.surfaceHighlight");
      expect(
        screen.getByTestId("callout-card-icon").getAttribute("class")
      ).toContain("warning.textLow");
      expect(
        screen.getByTestId("callout-card-title").getAttribute("class")
      ).toContain("warning.textLow");
      expect(
        screen.getByTestId("callout-card-subtitle").getAttribute("class")
      ).toContain("warning.textLow");
      expect(
        screen.getByTestId("callout-card-open-icon").getAttribute("class")
      ).toContain("warning.textLow");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({
        title: "My tittle",
        subtitle: "My subtitle",
        appearance: "danger",
        icon: () => <svg data-testid="icon-element" />,
      });
      expect(
        screen.getByTestId("callout-card-element").getAttribute("class")
      ).toContain("danger.surfaceHighlight");
      expect(
        screen.getByTestId("callout-card-icon").getAttribute("class")
      ).toContain("danger.textLow");
      expect(
        screen.getByTestId("callout-card-title").getAttribute("class")
      ).toContain("danger.textLow");
      expect(
        screen.getByTestId("callout-card-subtitle").getAttribute("class")
      ).toContain("danger.textLow");
      expect(
        screen.getByTestId("callout-card-open-icon").getAttribute("class")
      ).toContain("danger.textLow");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({
        title: "My tittle",
        subtitle: "My subtitle",
        appearance: "neutral",
        icon: () => <svg data-testid="icon-element" />,
      });
      expect(
        screen.getByTestId("callout-card-element").getAttribute("class")
      ).toContain("neutral.surfaceHighlight");
      expect(
        screen.getByTestId("callout-card-icon").getAttribute("class")
      ).toContain("neutral.textLow");
      expect(
        screen.getByTestId("callout-card-title").getAttribute("class")
      ).toContain("neutral.textLow");
      expect(
        screen.getByTestId("callout-card-subtitle").getAttribute("class")
      ).toContain("neutral.textLow");
      expect(
        screen.getByTestId("callout-card-open-icon").getAttribute("class")
      ).toContain("neutral.textLow");
    });
  });
});
