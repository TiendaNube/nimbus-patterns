import { ComponentProps } from "react";
import { DayPicker } from "react-day-picker";

type CalendarExtends = ComponentProps<typeof DayPicker>;

export type EditorProps = CalendarExtends & {};
