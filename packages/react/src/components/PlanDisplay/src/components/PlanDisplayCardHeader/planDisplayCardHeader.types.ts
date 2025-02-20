import { PropsWithChildren, ReactNode } from "react";

type CardHeaderProps = {
  subtitle: string;
  title: ReactNode;
};
export type PlanDisplayCardHeaderProps = PropsWithChildren<CardHeaderProps>;
