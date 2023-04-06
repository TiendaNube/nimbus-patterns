import React from "react";
import { render, screen } from "@testing-library/react";

import { FormFieldTextarea } from "./FormFieldTextarea";
import { FormFieldTextareaProps } from "./formFieldTextarea.types";

const makeSut = (rest: Omit<FormFieldTextareaProps, "id">) => {
  render(
    <FormFieldTextarea
      {...rest}
      data-testid="form-field-element"
      id="textarea"
    />
  );
};

describe("GIVEN <FormFieldTextarea />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the textarea element correctly", () => {
      makeSut({});
      expect(screen.getByRole("textbox")).toBeDefined();
    });
  });
});
