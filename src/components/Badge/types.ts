import type { ComponentPropsWithRef } from "react";
import type { Size } from "@/context/sizeContext";
import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type BadgeProps = ComponentPropsWithRef<"span"> &
  BaseComponentProps & {
    /** Visual tone. @default "neutral" */
    variant?: "neutral" | "positive" | "negative";
    /** Size; inherits from nearest `SizeProvider` when omitted. */
    size?: Size;
  };
