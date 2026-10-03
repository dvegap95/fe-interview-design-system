import type { ComponentPropsWithRef } from "react";
import type { Size } from "@/context/sizeContext";
import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type BadgeProps = ComponentPropsWithRef<"span"> &
  BaseComponentProps & {
    variant?: "neutral" | "positive" | "negative";
    size?: Size;
  };
