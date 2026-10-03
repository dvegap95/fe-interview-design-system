import type { ComponentPropsWithRef } from "react";
import type { ActiveTabContextProviderProps } from "@/context/activeTabContext";
import type { Size } from "@/context/sizeContext";
import type { TabVariant } from "@/context/tabVariantContext";
import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type TabsOrientation = "horizontal" | "vertical";

export type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export type TabsProps = ComponentPropsWithRef<"div"> &
  BaseComponentProps & {
    variant?: TabVariant;
    size?: Size;
    autoScrollBehavior?: ScrollIntoViewOptions["behavior"] | "none";
    orientation?: TabsOrientation;
  };

export type ManagedTabsProps = BaseComponentProps & ActiveTabContextProviderProps & TabsProps;

export type UseTabsProps = Omit<TabsProps, "children">;
