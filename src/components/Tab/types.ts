import type { ComponentPropsWithRef } from "react";
import type { Size } from "@/context/sizeContext";
import type { TabVariant } from "@/context/tabVariantContext";
import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type TabProps = ComponentPropsWithRef<"button"> &
  BaseComponentProps & {
    /** Visual style; inherits from nearest `TabVariantProvider` when omitted. */
    variant?: TabVariant;
    /** Forces selected appearance when used outside active-tab context. */
    selected?: boolean;
    /** Size; inherits from nearest `SizeProvider` when omitted. */
    size?: Size;
    /**
     * Value matched against the active tab from context.
     * Required for selection under the provider — without it, clicks are a no-op.
     */
    value?: string;
    /** Optional trailing content (typically a `Badge`). */
    slots?: {
      end?: React.ReactNode;
    };
  };

export type UseTabProps = Omit<TabProps, "children">;
