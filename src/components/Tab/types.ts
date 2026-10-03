import type { ComponentPropsWithRef } from "react";
import type { Size } from "@/context/sizeContext";
import type { TabVariant } from "@/context/tabVariantContext";
import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type TabProps = ComponentPropsWithRef<"button"> &
  BaseComponentProps & {
    variant?: TabVariant;
    selected?: boolean;
    size?: Size;
    value?: string;
    slots?: {
      end?: React.ReactNode;
    };
  };

export type UseTabProps = Omit<TabProps, "children">;
