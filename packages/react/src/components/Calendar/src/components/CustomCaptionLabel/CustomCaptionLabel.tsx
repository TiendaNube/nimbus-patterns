import React from "react";
import { CaptionLabelProps, useDayPicker } from "react-day-picker";

import { Text } from "@nimbus-ds/components";

const CustomCaptionLabel: React.FC<CaptionLabelProps> = ({
  ...rest
}: CaptionLabelProps) => {
  const {
    locale,
    formatters: { formatCaption }
  } = useDayPicker();
  return (
    <Text fontSize="highlight" fontWeight="medium" {...rest}>
      {formatCaption(rest.displayMonth, { locale })}
    </Text>
  );
};

export { CustomCaptionLabel };
