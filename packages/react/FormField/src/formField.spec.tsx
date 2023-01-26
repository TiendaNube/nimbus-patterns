import React from "react";
import { render, screen } from "@testing-library/react";

import { FormField } from "./FormField";
import { FormFieldProps } from "./formField.types";

const makeSut = (rest: Omit<FormFieldProps, "children">) => {
  render(
    <FormField {...rest} data-testid="form-field-element">
      <input id="email" type="text" />
    </FormField>
  );
};

const labelText = "Email";
const helpText = "Enter your email address";

describe("GIVEN <FormField />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render label text correctly", () => {
      makeSut({ label: labelText });
      expect(screen.getByText(labelText)).toBeDefined();
    });

    describe("SHOULD render the help text correctly", () => {
      it("SHOULD render the help text hidden by default", () => {
        makeSut({ helpText });
        expect(screen.queryByText(helpText)).toBeNull();
      });

      it("SHOULD render help text correctly when showHelpText is true", () => {
        makeSut({ helpText, showHelpText: true });
        expect(screen.getByText(helpText)).toBeDefined();
      });
    });

    it("SHOULD render children correctly", () => {
      makeSut({});
      expect(screen.getByRole("textbox")).toBeDefined();
    });
  });
});
