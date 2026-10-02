import { TabListContextProviderProps, TabListContextType, TabListLayoutProps, TabListProps } from "./types";
import { useTabListContextProvider } from "./useTabList";
import { cn } from "@/lib/utils";
import { createContext, useContext } from "react";

import styles from './TabList.module.scss';

export const TabListContext = createContext<TabListContextType>({
    activeTab: '',
    setActiveTab: () => { },
});

export function useOptionalTabListContext() {
    return useContext(TabListContext);
}

export function TabListContextProvider(props: TabListContextProviderProps){
    const contextValue = useTabListContextProvider(props);
    return <TabListContext.Provider value={contextValue}>{props.children}</TabListContext.Provider>;
}

export function TabListLayout({ children, className, ...props }: TabListLayoutProps){
    return <div role="tablist" {...props} className={cn(className, styles['tabListLayout'])}>{children}</div>;
}

export default function TabList(
    { activeTab, onActiveTabChange, defaultActiveTab, children, ...props }: TabListProps
) {
    return <TabListContextProvider activeTab={activeTab} onActiveTabChange={onActiveTabChange} defaultActiveTab={defaultActiveTab}>
        <TabListLayout {...props}>{children}</TabListLayout>
    </TabListContextProvider>;
};
