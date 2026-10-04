import type { ComponentPropsWithRef } from "react";
import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type TabPanelProps = ComponentPropsWithRef<"section"> &
  BaseComponentProps & {
    /** Shown when this value matches the active tab from context. */
    value: string;
  };

export type UseTabPanelProps = Omit<TabPanelProps, "children">;
