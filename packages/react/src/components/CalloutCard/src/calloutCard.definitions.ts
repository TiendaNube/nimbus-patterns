export const cardBackground = {
  primary: "primary-surface",
  success: "success-surface",
  warning: "warning-surface",
  danger: "danger-surface",
  neutral: "neutral-surface",
} as {
  [key: string]:
    | "primary-surface"
    | "success-surface"
    | "warning-surface"
    | "danger-surface"
    | "neutral-surface";
};

export const cardBorder = {
  primary: "primary-interactive",
  success: "success-interactive",
  warning: "warning-interactive",
  danger: "danger-interactive",
  neutral: "neutral-interactive",
} as {
  [key: string]:
    | "primary-interactive"
    | "success-interactive"
    | "warning-interactive"
    | "danger-interactive"
    | "neutral-interactive";
};

export const iconBackground = {
  primary: "primary-surfaceHighlight",
  success: "success-surfaceHighlight",
  warning: "warning-surfaceHighlight",
  danger: "danger-surfaceHighlight",
  neutral: "neutral-surfaceHighlight",
} as {
  [key: string]:
    | "primary-surfaceHighlight"
    | "success-surfaceHighlight"
    | "warning-surfaceHighlight"
    | "danger-surfaceHighlight"
    | "neutral-surfaceHighlight";
};

export const iconColor = {
  primary: "primary-textLow",
  success: "success-textLow",
  warning: "warning-textLow",
  danger: "danger-textLow",
  neutral: "neutral-textHigh",
} as {
  [key: string]:
    | "primary-textLow"
    | "success-textLow"
    | "warning-textLow"
    | "danger-textLow"
    | "neutral-textHigh";
};

export const textColor = iconColor;
