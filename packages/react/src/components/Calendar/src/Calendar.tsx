import React from "react";

import { Box } from "@nimbus-ds/components";
import { ChevronLeftIcon, ChevronRightIcon } from "@nimbus-ds/icons";
import { calendar } from "@nimbus-ds/styles";
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
          table: calendar.classnames.table,
          row: calendar.classnames.row,
          cell: calendar.classnames.cell,
          caption: calendar.classnames.caption,
          caption_start: calendar.classnames.caption_start,
          caption_end: calendar.classnames.caption_end,
          head: stickyWeekdays
            ? calendar.classnames.head_stickyWeekdays
            : calendar.classnames.head,
          head_row: calendar.classnames.row,
          head_cell: calendar.classnames.cell__head,
          tbody: calendar.classnames.body,
          nav: calendar.classnames.nav,
          nav_button_previous: calendar.classnames.nav__button,
          nav_button_next: calendar.classnames.nav__button,
          day: fullWidthDays
            ? calendar.classnames.day_fullWidth
            : calendar.classnames.day,
          day_selected: calendar.classnames.day_selected,
          day_today: calendar.classnames.day_today,
          day_outside: calendar.classnames.day_outside,
          day_disabled: calendar.classnames.day_disabled,
          day_range_middle: calendar.classnames.day__middle,
          day_range_start: calendar.classnames.day__start,
          day_range_end: calendar.classnames.day__end,
          months: calendar.classnames.months,
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
