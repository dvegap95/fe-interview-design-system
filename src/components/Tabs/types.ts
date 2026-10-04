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
    /** Visual style pushed to child tabs via context. @default "pill" */
    variant?: TabVariant;
    /** Size pushed to child tabs (and nested badges) via context. @default "md" */
    size?: Size;
    /**
     * Scroll the selected tab into view within an overflowing list.
     * `"none"` disables auto-scroll; any other value is passed to `scrollIntoView`
     * as `behavior` (`auto` / `smooth` / `instant`).
     * @default "none"
     */
    autoScrollBehavior?: ScrollIntoViewOptions["behavior"] | "none";
    /** Tab list orientation for layout and arrow-key navigation. @default "horizontal" */
    orientation?: TabsOrientation;
  };

/** `Tabs` visuals plus active-tab selection state (`ActiveTabContextProvider`). */
export type ManagedTabsProps = BaseComponentProps & ActiveTabContextProviderProps & TabsProps;

export type UseTabsProps = Omit<TabsProps, "children">;
