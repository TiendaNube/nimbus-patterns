import React from "react";
import { render, screen } from "@testing-library/react";

import { FormField } from "../../FormField";
import { FormFieldSelectProps } from "./formFieldSelect.types";

const makeSut = (
  rest?: Omit<FormFieldSelectProps, "children" | "id" | "name">
) => {
  render(
    <FormField.Select
      {...rest}
      id="select-element"
      name="select-element"
      data-testid="form-field-element"
    >
      <option>option 1</option>
      <option>option 2</option>
      <option>option 3</option>
    </FormField.Select>
  );
};

describe("GIVEN <FormFieldSelect />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the select element correctly", () => {
      makeSut();
      expect(screen.getByRole("combobox")).toBeDefined();
    });

    it("SHOULD render children correctly", () => {
      makeSut();
      expect(screen.getByText("option 1")).toBeDefined();
    });
  });
});
