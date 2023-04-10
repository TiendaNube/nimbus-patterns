import { HTMLAttributes, ReactNode } from "react";

export interface EmptyMessageProperties {
  /**
   * Optional node that contains an illustration for the component. Will stack vertically on mobile and horizontally on desktop.
   * @TJS-type React.ReactNode
   */
  illustration?: ReactNode;
  /**
   * Optional icon to display on top of the text.
   * @TJS-type React.ReactNode
   */
  icon?: ReactNode;
  /**
   * Title of the component.
   */
  title: string;
  /**
   * Optional content text for additional context.
   */
  text?: string;
  /**
   * Optional node to showcase buttons or actions.
   * @TJS-type React.ReactNode
   */
  actions?: ReactNode;
}

export type EmptyMessageProps = EmptyMessageProperties &
  Omit<HTMLAttributes<HTMLElement>, "color">;
