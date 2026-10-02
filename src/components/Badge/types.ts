import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type BadgeProps = BaseComponentProps & {
  variant?: "neutral" | "positive" | "negative";
  size?: "sm" | "md";
};
