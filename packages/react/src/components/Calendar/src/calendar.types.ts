import { ComponentProps } from "react";
import { DayPicker } from "react-day-picker";
import { BoxProps } from "@nimbus-ds/components";

type CalendarExtends = ComponentProps<typeof DayPicker>;

export interface CalendarProperties {
  /**
   * Ability to hide the border of the calendar container. Useful for including the calendar inside other components such as Modal, Popover or Card.
   * @default false
   */
  hideBorder?: boolean;
  /**
   * If true will stick the weekday indicators to the top of the component. Useful for when creating scrolling calendars with a display of >1 months. Only works when property numberOfMonths is set to a number greater than 1.
   * @default false
   */
  stickyWeekdays?: boolean;
  /**
   * If true the buttons for individual days will span 100% of available width as opposed to the default state where they have a fixed width. Useful for when creating calendars inside containers that are wider than default.
   * @default false
   */
  fullWidthDays?: boolean;
}

export type CalendarProps = CalendarProperties &
  CalendarExtends & {
    /**
     * Spreads the properties of the Box component to the calendar wrapper.
     */
    containerProps?: BoxProps;
  };
