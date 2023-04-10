import React from "react";
import { render, screen } from "@testing-library/react";

import { FormField } from "../../FormField";
import { FormFieldTextareaProps } from "./formFieldTextarea.types";

const makeSut = (rest?: Omit<FormFieldTextareaProps, "id">) => {
  render(
    <FormField.Textarea
      {...rest}
      data-testid="form-field-element"
      id="textarea"
    />
  );
};

describe("GIVEN <FormFieldTextarea />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the textarea element correctly", () => {
      makeSut();
      expect(screen.getByRole("textbox")).toBeDefined();
    });
  });
});
