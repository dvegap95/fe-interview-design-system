import { BaseComponentProps } from "@/types/baseComponentTypes";
import { HTMLAttributes, ReactNode } from "react";

export type TabListContextType = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
};

export type TabListContextProviderProps = {
    children?: ReactNode;
    activeTab?: string;
    onActiveTabChange?: (tab: string) => void;
    defaultActiveTab?: string;
};

export type TabListLayoutProps = HTMLAttributes<HTMLDivElement> & BaseComponentProps;

export type TabListProps = BaseComponentProps & TabListContextProviderProps;

export type UseTabListContextProviderProps = Omit<TabListContextProviderProps, 'children'>;
export type UseTabListProps = Omit<TabListProps, 'children'>;
