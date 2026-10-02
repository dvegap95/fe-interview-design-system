import type { HTMLAttributes, ReactNode } from "react";
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

export type TabsProps = HTMLAttributes<HTMLDivElement> &
  BaseComponentProps;

export type TabsWithContextProps = BaseComponentProps & TabsContextProviderProps;

export type UseTabsContextProviderProps = Omit<TabsContextProviderProps, "children">;
export type UseTabsWithContextProps = Omit<TabsWithContextProps, "children">;
