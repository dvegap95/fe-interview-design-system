import type { ComponentPropsWithRef, ReactNode } from "react";
import type { Size } from "@/context/sizeContext";
import type { TabVariant } from "@/context/tabVariantContext";
import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export type TabsContextProviderProps = {
  children?: ReactNode;
  activeTab?: string;
  onActiveTabChange?: (tab: string) => void;
  defaultActiveTab?: string;
};

export type TabsProps = ComponentPropsWithRef<"div"> &
  BaseComponentProps & {
    variant?: TabVariant;
    size?: Size;
    autoScrollBehavior?: ScrollIntoViewOptions["behavior"] | "none";
  };

export type TabsWithContextProps = BaseComponentProps & TabsContextProviderProps & TabsProps;

export type UseTabsContextProviderProps = Omit<TabsContextProviderProps, "children">;
export type UseTabsProps = Omit<TabsProps, "children">;
