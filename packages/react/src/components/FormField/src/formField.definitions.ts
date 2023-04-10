export const inputAppearance = {
  danger: "danger",
  warning: "warning",
  success: "success",
  none: "neutral",
} as {
  [key: string]: "danger" | "warning" | "success" | "neutral";
};

export const helpTextAppearance = {
  danger: "danger-textLow",
  warning: "warning-textLow",
  success: "success-textLow",
  none: "neutral-textLow",
} as {
  [key: string]:
    | "danger-textLow"
    | "warning-textLow"
    | "success-textLow"
    | "neutral-textLow";
};
