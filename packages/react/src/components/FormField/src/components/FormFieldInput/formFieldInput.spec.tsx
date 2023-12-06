import React from "react";
import { render, screen } from "@testing-library/react";

import { FormField } from "../../FormField";
import { FormFieldInputProps } from "./FormFieldInput";

const makeSut = (rest?: FormFieldInputProps) => {
  render(<FormField.Input {...rest} data-testid="form-field-element" />);
};

describe("GIVEN <FormFieldInput />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the input element correctly", () => {
      makeSut();
      expect(screen.getByRole("textbox")).toBeDefined();
    });
  });
});
