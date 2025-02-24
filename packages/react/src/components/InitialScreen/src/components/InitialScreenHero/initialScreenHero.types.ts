import { ReactNode, ReactElement, PropsWithChildren } from "react";
import { BoxProps } from "@nimbus-ds/components";
import InitialScreenBullet, {
  InitialScreenBulletProps,
} from "../InitialScreenBullet";

type BaseHeroProps = {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  image: ReactNode;
  // Description can have complex content to accept bold, italic, translations and other text styles embedded
  description?: ReactNode;
  bullets?: ReactElement<
    InitialScreenBulletProps,
    typeof InitialScreenBullet
  >[];
};

export type InitialScreenHeroProps = PropsWithChildren<BaseHeroProps> &
  Omit<BoxProps, "alignItems" | "mx">;
