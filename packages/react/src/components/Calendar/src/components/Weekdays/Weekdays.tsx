import React from "react";
import { useDayPicker } from "react-day-picker";
import { Box, Text } from "@nimbus-ds/components";
import { getWeekdays } from "../../utils";

const Weekdays: React.FC = () => {
  const {
    locale,
    weekStartsOn,
    ISOWeek,
    formatters: { formatWeekdayName },
    labels: { labelWeekday },
  } = useDayPicker();

  const weekdays = getWeekdays(locale, weekStartsOn, ISOWeek);

  return (
    <Box
      display="flex"
      width="100%"
      backgroundColor="neutral-surface"
      position="sticky"
      top="0"
      py="2"
      px="4"
      zIndex="100"
    >
      {weekdays.map((weekday) => (
        <Box
          key={labelWeekday(weekday, { locale })}
          display="flex"
          flex="1"
          alignItems="center"
          justifyContent="center"
          aria-label={labelWeekday(weekday, { locale })}
        >
          <Text textAlign="center" fontSize="caption" fontWeight="medium">
            {formatWeekdayName(weekday, { locale })}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export { Weekdays };
