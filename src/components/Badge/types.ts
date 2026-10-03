import type { Size } from "@/context/sizeContext";
import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type BadgeProps = BaseComponentProps & {
  variant?: "neutral" | "positive" | "negative";
  size?: Size;
};
