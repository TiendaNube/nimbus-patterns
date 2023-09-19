import React from "react";
import { DayPickerProvider } from "react-day-picker";
import { WrapperProps } from "./wrapper.types";

const Wrapper: React.FC<WrapperProps> = ({
  children,
  ...rest
}: WrapperProps) => <DayPickerProvider {...rest}>{children}</DayPickerProvider>;

export { Wrapper };
