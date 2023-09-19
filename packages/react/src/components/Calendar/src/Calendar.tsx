import React from "react";

import "./calendar.css";

import { Box } from "@nimbus-ds/components";
import { ChevronLeftIcon, ChevronRightIcon } from "@nimbus-ds/icons";
import { DayPicker } from "react-day-picker";
import { CalendarProps } from "./calendar.types";
import { CustomCaptionLabel, CustomDay, Weekdays, Wrapper } from "./components";

const Calendar: React.FC<CalendarProps> = ({
  className: _className,
  style: _style,
  hideBorder = false,
  containerProps,
  stickyWeekdays = false,
  fullWidthDays = false,
  ...rest
}: CalendarProps) => (
  <Wrapper initialProps={{ ...rest }}>
    <Box
      borderWidth={hideBorder ? "none" : "1"}
      borderStyle="solid"
      borderColor="neutral-surfaceHighlight"
      borderRadius="2"
      data-style="nimbus-calendar"
      overflowY="auto"
      position="relative"
      {...containerProps}
    >
      {rest.numberOfMonths && rest.numberOfMonths > 1 && stickyWeekdays && (
        <Weekdays />
      )}
      <DayPicker
        {...rest}
        classNames={{
          table: "nimbus-calendar-table",
          row: "nimbus-calendar-row",
          cell: "nimbus-calendar-cell",
          caption: "nimbus-calendar-caption",
          caption_start: "nimbus-calendar-caption--start",
          caption_between: "nimbus-calendar-caption--between",
          caption_end: "nimbus-calendar-caption--end",
          head: `nimbus-calendar-head ${stickyWeekdays && "sticky-weekdays"}`,
          head_row: "nimbus-calendar-row",
          head_cell: "nimbus-calendar-cell nimbus-calendar-cell--head",
          tbody: "nimbus-calendar-body",
          nav: "nimbus-calendar-nav",
          nav_button_previous:
            "nimbus-calendar-nav-button nimbus-calendar-nav-button--left",
          nav_button_next:
            "nimbus-calendar-nav-button nimbus-calendar-nav-button--right",
          day: `nimbus-calendar-day ${fullWidthDays && "full-width"}`,
          day_selected: "nimbus-calendar-day--selected",
          day_today: "nimbus-calendar-day--today",
          day_outside: "nimbus-calendar-day--outside",
          day_disabled: "nimbus-calendar-day--disabled",
          day_range_middle: "nimbus-calendar-day--range-middle",
          day_range_start: "nimbus-calendar-day--range-start",
          day_range_end: "nimbus-calendar-day--range-end",
          months: "nimbus-calendar-months",
          month: "nimbus-calendar-month",
        }}
        components={{
          CaptionLabel: CustomCaptionLabel,
          IconLeft: ChevronLeftIcon,
          IconRight: ChevronRightIcon,
          Day: CustomDay,
        }}
      />
    </Box>
  </Wrapper>
);

Calendar.displayName = "Calendar";

export { Calendar };
