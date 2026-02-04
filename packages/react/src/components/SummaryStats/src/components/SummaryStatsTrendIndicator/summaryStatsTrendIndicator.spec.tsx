import React from "react";
import { render, screen } from "@testing-library/react";

import { SummaryStatsTrendIndicator } from "./SummaryStatsTrendIndicator";
import { SummaryStatsTrendIndicatorProps } from "./summaryStatsTrendIndicator.types";

const makeSut = (props: SummaryStatsTrendIndicatorProps) => {
  render(
    <SummaryStatsTrendIndicator
      {...props}
      data-testid="trend-indicator-element"
    />
  );
};

describe("GIVEN <SummaryStatsTrendIndicator />", () => {
  describe("WHEN rendered with trend up", () => {
    it("THEN should render the text with success color", () => {
      makeSut({ trend: "up", text: "15%" });
      expect(screen.getByText("15%")).toBeDefined();
    });
  });

  describe("WHEN rendered with trend down", () => {
    it("THEN should render the text with danger color", () => {
      makeSut({ trend: "down", text: "8%" });
      expect(screen.getByText("8%")).toBeDefined();
    });
  });

  describe("WHEN rendered with neutral trend", () => {
    it("THEN should render the text with neutral color", () => {
      makeSut({ trend: "neutral", text: "0%" });
      expect(screen.getByText("0%")).toBeDefined();
    });
  });

  describe("WHEN rendered without text", () => {
    it("THEN should render the icon only", () => {
      makeSut({ trend: "up" });
      expect(screen.getByTestId("trend-indicator-element")).toBeDefined();
    });
  });

  describe("WHEN rendered with neutral trend without text", () => {
    it("THEN should render empty container (no icon for neutral)", () => {
      makeSut({ trend: "neutral" });
      const element = screen.getByTestId("trend-indicator-element");
      expect(element).toBeDefined();
      expect(element.textContent).toBe("");
    });
  });
});
