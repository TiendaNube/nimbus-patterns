import React, { ReactNode } from "react";

// Standard visually-hidden ("sr-only") treatment: keeps content in the
// accessibility tree and exposed to assistive technology while producing no
// visual footprint. Implemented with a plain inline style (rather than Box)
// because Box does not forward an arbitrary `style` prop in this repo.
// Internal to PlanDisplay.Bullet — not part of its public API, so it is not
// re-exported from this folder's index.ts.
const visuallyHiddenStyle: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const VisuallyHidden: React.FC<{ children: ReactNode }> = ({ children }) => (
  <span style={visuallyHiddenStyle}>{children}</span>
);

export { VisuallyHidden };
