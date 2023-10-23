import React from "react";
import { editor } from "@nimbus-ds/styles";

import { PlaceholderProps } from "./placeholder.types";

const Placeholder: React.FC<PlaceholderProps> = ({ text }) => {
  if (!text) return null;
  return <div className={editor.classnames.placeholder}>{text}</div>;
};

export { Placeholder };
