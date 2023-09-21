import React from "react";
import { render, screen } from "@testing-library/react";

import { Calendar } from "./Calendar";
import { CalendarProps } from "./calendar.types";

const makeSut = (rest: CalendarProps) => {
  render(<Calendar {...rest} data-testid="calendar-element" />);
};

describe("GIVEN <Calendar />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the calendar correctly", () => {
      makeSut({});
      expect(screen.getByTestId("calendar-element")).toBeDefined();
    });
  });
});
