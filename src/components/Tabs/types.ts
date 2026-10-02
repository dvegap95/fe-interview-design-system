import type { HTMLAttributes, ReactNode } from "react";
import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export type TabListContextType = {
  variant?: "pill" | "underline";
  size?: "sm" | "md";
};

export type TabsContextProviderProps = {
  children?: ReactNode;
  activeTab?: string;
  onActiveTabChange?: (tab: string) => void;
  defaultActiveTab?: string;
};

export type TabsProps = HTMLAttributes<HTMLDivElement> &
  BaseComponentProps & {
    variant?: "pill" | "underline";
    size?: "sm" | "md";
  };

export type TabsWithContextProps = BaseComponentProps & TabsContextProviderProps & TabsProps;

export type UseTabsContextProviderProps = Omit<TabsContextProviderProps, "children">;
export type UseTabsProps = Omit<TabsProps, "children">;
export type UseTabsWithContextProps = Omit<TabsWithContextProps, "children">;
