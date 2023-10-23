import { ReactNode } from "react";
import { DayPickerProviderProps } from "react-day-picker";

export interface WrapperProperties {
  /** Content of the wrapper which will inherit the base props for the Day Picker component. */
  children: ReactNode;
}

export type WrapperProps = WrapperProperties & DayPickerProviderProps;
