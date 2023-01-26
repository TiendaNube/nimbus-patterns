import React from "react";
import { render, screen } from "@testing-library/react";

import { FormFieldInput } from "./FormFieldInput";
import { FormFieldInputProps } from "./formFieldInput.types";

const makeSut = (rest: FormFieldInputProps) => {
  render(<FormFieldInput {...rest} data-testid="form-field-element" />);
};

describe("GIVEN <FormFieldInput />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the input element correctly", () => {
      makeSut({});
      expect(screen.getByRole("textbox")).toBeDefined();
    });
  });
});
