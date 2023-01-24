import React from "react";
import { render, screen } from "@testing-library/react";

import { FormFieldSelect } from "./FormFieldSelect";
import { FormFieldSelectProps } from "./formFieldSelect.types";

const makeSut = (
  rest: Omit<FormFieldSelectProps, "children" | "id" | "name">
) => {
  render(
    <FormFieldSelect
      {...rest}
      id="select-element"
      name="select-element"
      data-testid="form-field-element"
    >
      <option>option 1</option>
      <option>option 2</option>
      <option>option 3</option>
    </FormFieldSelect>
  );
};

describe("GIVEN <FormFieldSelect />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the select element correctly", () => {
      makeSut({});
      expect(screen.getByRole("combobox")).toBeDefined();
    });

    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByText("option 1")).toBeDefined();
    });
  });
});
