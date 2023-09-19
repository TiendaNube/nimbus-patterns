import React from "react";

import { Day } from "react-day-picker";
import { format } from "date-fns";
import { CustomDayProps } from "./customDay.types";

const CustomDay: React.FC<CustomDayProps> = ({ ...props }: CustomDayProps) => (
  <div id={format(props.date, "yyyy-MM-dd")} style={{ width: "100%" }}>
    <Day {...props} />
  </div>
);

export { CustomDay };
