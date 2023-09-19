/* eslint-disable import/no-duplicates */
import React, { useState, useEffect, useRef } from "react";

import {
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  Modal,
  Popover,
  Text,
  Title,
  Toggle
} from "@nimbus-ds/components";
import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@nimbus-ds/icons";
import { MenuButton } from "@nimbus-ds/menubutton";
import {
  DaySelectionMode,
  DateRange,
  SelectSingleEventHandler,
  SelectRangeEventHandler,
} from "react-day-picker";
import {
  addMonths,
  endOfWeek,
  endOfYear,
  format,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears
} from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "./Calendar";

interface DateRangesProps {
  label: string;
  mode: DaySelectionMode;
  date: Date | DateRange;
}

interface SelectedDateDisplayProps {
  selectedDate: Date | DateRange | undefined;
}

const formatDate = (date: Date): string => format(date, "PP");

function SelectedDateDisplay({ selectedDate }: SelectedDateDisplayProps) {
  if (selectedDate instanceof Date) {
    return <Text fontSize="caption">{formatDate(selectedDate)}.</Text>;
  }
  if (selectedDate && "from" in selectedDate && "to" in selectedDate) {
    return (
      <Box display="flex" gap="2" alignItems="center">
        {selectedDate.from && (
          <Text fontSize="caption">{formatDate(selectedDate.from)}</Text>
        )}
        <Icon color="neutral-textLow" source={<ArrowRightIcon size={12} />} />
        {selectedDate.to && (
          <Text fontSize="caption">{formatDate(selectedDate.to)}</Text>
        )}
      </Box>
    );
  }
  return <Text fontSize="caption">Please select a date.</Text>;
}

export const CalendarRender = (args: any) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date>(today);
  const { stickyWeekdays, fullWidthDays } = args;
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="2"
    >
      <Calendar
        {...args}
        mode="single"
        showOutsideDays
        selected={selectedDate}
        onSelect={setSelectedDate}
        toDate={today}
        month={month}
        onMonthChange={setMonth}
        numberOfMonths={stickyWeekdays ? 4 : 1}
        containerProps={{
          width: fullWidthDays ? "600px" : "",
          height: "100%",
          overflowY: "auto",
          maxHeight: "400px"
        }}
      />
      {selectedDate ? (
        <Text>Selected date is {format(selectedDate, "dd-MM-yyyy")}</Text>
      ) : (
        <Text>Select a date</Text>
      )}
    </Box>
  );
};

export const DatePickerRender = (args: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const { stickyWeekdays, fullWidthDays } = args;
  const calendar = (
    <Calendar
      {...args}
      mode="single"
      showOutsideDays
      selected={selectedDate}
      onSelect={setSelectedDate}
      hideBorder
      fullWidthDays
      numberOfMonths={stickyWeekdays ? 4 : 1}
      containerProps={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        maxHeight: "400px"
      }}
    />
  );

  return (
    <Popover
      content={calendar}
      padding="none"
      arrow={false}
      width={fullWidthDays ? "100%" : ""}
    >
      <Input
        readOnly
        value={selectedDate && format(selectedDate, "dd-MM-yyyy")}
        placeholder="Select a date"
        append={<Icon color="neutral-textLow" source={<CalendarIcon />} />}
        appendPosition="end"
      />
    </Popover>
  );
};

export const ScrollingDatePickerModal = (args: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Set dates");
  const [selectedMode, setSelectedMode] = useState<DaySelectionMode>("single");
  const today = new Date();
  const yesterday = new Date(subDays(today, 1));
  const elevenMonthsAgo = addMonths(today, -11);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>();
  const [month, setMonth] = useState<Date>(elevenMonthsAgo);
  const handlePrevClick = () => {
    setMonth((currentMonth: Date) => addMonths(currentMonth, -12));
  };
  const handleNextClick = () => {
    setMonth((currentMonth: Date) => addMonths(currentMonth, 12));
  };
  const handleRangeButtonClick = (
    mode: DaySelectionMode,
    range: string,
    date: Date | DateRange
  ) => {
    if (mode === "single") {
      setSelectedDate(date as Date);
    } else {
      setSelectedDateRange(date as DateRange);
    }
    setSelectedMode(mode);
    setSelectedRange(range);
  };

  const dateRanges: Array<DateRangesProps> = [
    {
      label: "Today",
      mode: "single",
      date: today
    },
    {
      label: "Yesterday",
      mode: "single",
      date: yesterday
    },
    {
      label: "This week",
      mode: "range",
      date: { from: startOfWeek(today), to: endOfWeek(today) }
    },
    {
      label: "Last week",
      mode: "range",
      date: {
        from: startOfWeek(subWeeks(today, 1)),
        to: endOfWeek(subWeeks(today, 1))
      }
    },
    {
      label: "Last year",
      mode: "range",
      date: {
        from: startOfYear(subYears(today, 1)),
        to: endOfYear(subYears(today, 1))
      }
    },
    {
      label: "Last 7 days",
      mode: "range",
      date: { from: subDays(today, 7), to: today }
    },
    {
      label: "Last 30 days",
      mode: "range",
      date: { from: subDays(today, 30), to: today }
    },
    {
      label: "Last 90 days",
      mode: "range",
      date: { from: subDays(today, 90), to: today }
    },
    {
      label: "Last 12 months",
      mode: "range",
      date: { from: subMonths(today, 12), to: today }
    },
    {
      label: "Custom",
      mode: "range",
      date: { from: today, to: today }
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate) {
      const selectedDateId = format(selectedDate, "yyyy-MM-dd");
      document.getElementById(selectedDateId)?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDateRange) {
      if (selectedDateRange.to) {
        const selectedDateId = format(selectedDateRange.to, "yyyy-MM-dd");
        document.getElementById(selectedDateId)?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    }
  }, [selectedDateRange]);

  const handleSelectSingleDate: SelectSingleEventHandler = (date) => {
    if (date) {
      setSelectedDate(date);
      setSelectedRange("Custom");
      setMonth(addMonths(date, -11));
    }
  };

  const handleSelectDateRange: SelectRangeEventHandler = (range) => {
    if (range) {
      setSelectedDateRange(range);
      setSelectedRange("Custom");

      if (range.from) {
        setMonth(addMonths(range.from, -11));
      }
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap="2" mb="4">
        <Text>Selected date is:</Text>
        <SelectedDateDisplay
          selectedDate={
            selectedMode === "single" ? selectedDate : selectedDateRange
          }
        />
      </Box>
      <Button onClick={() => setOpenModal(true)}>Select dates</Button>
      <Modal
        onDismiss={() => setOpenModal(false)}
        padding="none"
        open={openModal}
        maxWidth={{ xs: "100%", md: "600px" }}
      >
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            md: "2fr 5fr"
          }}
          gridTemplateRows={{
            xs: "auto auto auto",
            md: "auto auto"
          }}
          gridTemplateAreas={{
            xs: `
              "calendar"
              "selector"
              "buttons"
            `,
            md: `
              "selector calendar"
              "buttons buttons"
            `
          }}
        >
          <Box
            gridArea="selector"
            display="flex"
            flexDirection="column"
            borderWidth="none"
            borderColor="neutral-surfaceHighlight"
            borderStyle="solid"
            borderRightWidth={{
              xs: "none",
              md: "1"
            }}
            borderTopWidth={{
              xs: "1",
              md: "none"
            }}
            padding="2"
          >
            {dateRanges.map((range) => (
              <MenuButton
                key={range.label}
                label={range.label}
                onClick={() =>
                  handleRangeButtonClick(range.mode, range.label, range.date)
                }
                active={selectedRange === range.label}
              />
            ))}
          </Box>
          <Box
            gridArea="calendar"
            maxHeight={{
              xs: "300px",
              md: "600px"
            }}
            position="relative"
            display="flex"
            flexDirection="column"
            data-style="nimbus-calendar"
          >
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
              width="100%"
              p="4"
              pr="12"
              flex="1 1 auto"
            >
              <Box display="flex" flexDirection="column" gap="1">
                <Title as="h3">{selectedRange}</Title>
                <SelectedDateDisplay
                  selectedDate={
                    selectedMode === "single" ? selectedDate : selectedDateRange
                  }
                />
              </Box>
              <Box display="flex" gap="2">
                <IconButton
                  onClick={handlePrevClick}
                  source={<ChevronLeftIcon />}
                  size="2rem"
                />
                <IconButton
                  onClick={handleNextClick}
                  source={<ChevronRightIcon />}
                  size="2rem"
                />
              </Box>
            </Box>
            <Box
              flex="0 1 auto"
              overflowY="auto"
              ref={containerRef}
              borderWidth="none"
              borderTopWidth="1"
              borderColor="neutral-surfaceHighlight"
              borderStyle="solid"
            >
              {selectedMode === "single" ? (
                <Calendar
                  hideBorder
                  disableNavigation
                  mode="single"
                  toDate={today}
                  numberOfMonths={12}
                  locale={es}
                  month={month}
                  onMonthChange={setMonth}
                  selected={selectedDate}
                  onSelect={handleSelectSingleDate}
                  containerProps={{
                    height: "100%"
                  }}
                  stickyWeekdays
                  fullWidthDays
                  {...args}
                />
              ) : (
                <Calendar
                  hideBorder
                  disableNavigation
                  mode="range"
                  toDate={today}
                  numberOfMonths={12}
                  locale={es}
                  month={month}
                  onMonthChange={setMonth}
                  selected={selectedDateRange}
                  onSelect={handleSelectDateRange}
                  containerProps={{
                    height: "100%"
                  }}
                  stickyWeekdays
                  fullWidthDays
                  {...args}
                />
              )}
            </Box>
          </Box>
          <Box
            gridArea="buttons"
            padding="4"
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
            gap="4"
            borderWidth="none"
            borderTopWidth="1"
            borderStyle="solid"
            borderColor="neutral-surfaceHighlight"
          >
            <Toggle name="compare" label="Comparar" />
            <Box display="flex" gap="2">
              <Button
                onClick={() => {
                  setOpenModal(false);
                  setSelectedDate(undefined);
                  setSelectedDateRange(undefined);
                  setSelectedRange("Configurar períodos");
                }}
              >
                Cancelar
              </Button>
              <Button onClick={() => setOpenModal(false)} appearance="primary">
                Guardar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
