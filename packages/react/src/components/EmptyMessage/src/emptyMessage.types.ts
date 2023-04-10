import { HTMLAttributes, ReactNode } from "react";

export interface EmptyMessageProps
  extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Optional node that contains an illustration for the component. Will stack vertically on mobile and horizontally on desktop. */
  illustration?: ReactNode;
  /** Optional icon to display on top of the text. */
  icon?: ReactNode;
  /** Title of the component */
  title: string;
  /** Optional content text for additional context. */
  text?: string;
  /** Optional node to showcase buttons or actions. */
  actions?: ReactNode;
}
