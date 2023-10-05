import React from "react";

import { PlaceholderProps } from "./placeholder.types";

const Placeholder: React.FC<PlaceholderProps> = ({ text }) => {
  return <>{text && <div className="placeholder">{text}</div>}</>;
};
export { Placeholder };
