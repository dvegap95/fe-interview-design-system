import type { ComponentPropsWithRef } from "react";
import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type TabPanelProps = ComponentPropsWithRef<"section"> &
  BaseComponentProps & {
    value: string;
  };

export type UseTabPanelProps = Omit<TabPanelProps, "children">;
