import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { DataTableDropdownContext } from "../DataTableDropdown/DataTableDropdownContext";
import { DataTableDropdownContextValue } from "../DataTableDropdown/dataTableDropdownContext.types";
import { DataTableDropdownAction } from "./DataTableDropdownAction";

const actionLabel = "Delete items";
const mockSetDropdownVisibility = jest.fn();

const makeContextValue = (
  overrides?: Partial<DataTableDropdownContextValue>
): DataTableDropdownContextValue => ({
  visible: true,
  setDropdownVisibility: mockSetDropdownVisibility,
  ...overrides,
});

const makeSut = (
  onClick?: jest.Mock,
  contextOverrides?: Partial<DataTableDropdownContextValue>
) => {
  render(
    <DataTableDropdownContext.Provider
      value={makeContextValue(contextOverrides)}
    >
      <DataTableDropdownAction label={actionLabel} onClick={onClick} />
    </DataTableDropdownContext.Provider>
  );
};

describe("GIVEN <DataTableDropdownAction />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("WHEN rendered inside a DataTableDropdown", () => {
    it("THEN should render the label text", () => {
      makeSut();
      expect(screen.getByText(actionLabel)).toBeDefined();
    });

    it("THEN should render a button element", () => {
      makeSut();
      expect(screen.getByRole("button")).toBeDefined();
    });
  });

  describe("WHEN clicked", () => {
    it("THEN should set dropdown visibility to false before calling onClick", () => {
      const onClickMock = jest.fn();
      makeSut(onClickMock);

      fireEvent.click(screen.getByRole("button"));

      expect(mockSetDropdownVisibility).toHaveBeenCalledWith(false);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("THEN should call setDropdownVisibility before onClick", () => {
      const callOrder: string[] = [];
      const onClickMock = jest.fn(() => callOrder.push("onClick"));
      mockSetDropdownVisibility.mockImplementation(() =>
        callOrder.push("setDropdownVisibility")
      );

      makeSut(onClickMock);
      fireEvent.click(screen.getByRole("button"));

      expect(callOrder).toEqual(["setDropdownVisibility", "onClick"]);
    });

    it("THEN should hide the dropdown even when no onClick handler is provided", () => {
      makeSut();
      fireEvent.click(screen.getByRole("button"));

      expect(mockSetDropdownVisibility).toHaveBeenCalledWith(false);
    });
  });

  describe("WHEN rendered outside a DataTableDropdown", () => {
    it("THEN should throw an error", () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => undefined);

      expect(() => {
        render(<DataTableDropdownAction label={actionLabel} />);
      }).toThrow(
        "useDataTableDropdownContext must be used within a DataTable.Dropdown"
      );

      consoleSpy.mockRestore();
    });
  });
});
