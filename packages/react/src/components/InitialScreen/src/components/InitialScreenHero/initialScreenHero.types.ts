import { ReactNode, ReactElement, PropsWithChildren } from "react";
import { BoxProps } from "@nimbus-ds/components";
import InitialScreenBullet, {
  InitialScreenBulletProps,
} from "../InitialScreenBullet";

type HeroImage = {
  alt: string;
  src: string;
};

type BaseHeroProps = {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  image: HeroImage;
  description?: string;
  bullets?: ReactElement<
    InitialScreenBulletProps,
    typeof InitialScreenBullet
  >[];
};

export type InitialScreenHeroProps = PropsWithChildren<BaseHeroProps> &
  Omit<BoxProps, "alignItems" | "mx" | "height">;
