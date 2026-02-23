import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { DataTableDropdown } from "./DataTableDropdown";
import { DataTableDropdownAction } from "../DataTableDropdownAction/DataTableDropdownAction";

const placeholderText = "Select an action";
const actionLabel = "Action item";

const makeSut = (onClick?: jest.Mock) => {
  render(
    <DataTableDropdown placeholder={placeholderText}>
      <DataTableDropdownAction label={actionLabel} onClick={onClick} />
    </DataTableDropdown>
  );
};

describe("GIVEN <DataTableDropdown />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the placeholder text", () => {
      makeSut();
      expect(screen.getByText(placeholderText)).toBeDefined();
    });

    it("THEN should render the trigger button", () => {
      makeSut();
      expect(
        screen.getByRole("button", { name: placeholderText })
      ).toBeDefined();
    });
  });

  describe("WHEN the trigger is clicked", () => {
    it("THEN should show the dropdown content", () => {
      makeSut();
      const trigger = screen.getByRole("button", { name: placeholderText });
      fireEvent.click(trigger);
      expect(screen.getByText(actionLabel)).toBeDefined();
    });
  });

  describe("WHEN an action is clicked", () => {
    it("THEN should hide the dropdown and call the onClick handler", () => {
      const onClickMock = jest.fn();
      makeSut(onClickMock);

      const trigger = screen.getByRole("button", { name: placeholderText });
      fireEvent.click(trigger);

      const action = screen.getByText(actionLabel);
      fireEvent.click(action);

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });
});
