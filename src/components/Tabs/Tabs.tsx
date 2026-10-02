import { TabsContextProviderProps, TabsContextType, TabsProps, TabsWithContextProps } from "./types";
import { useTabsContextProvider } from "./useTabs";
import { cn } from "@/lib/utils";
import { createContext, useContext } from "react";

import styles from './Tabs.module.scss';

export const TabsContext = createContext<TabsContextType>({
    activeTab: '',
    setActiveTab: () => { },
});

export function useOptionalTabsContext() {
    return useContext(TabsContext);
}

export function TabsContextProvider(props: TabsContextProviderProps){
    const contextValue = useTabsContextProvider(props);
    return <TabsContext.Provider value={contextValue}>{props.children}</TabsContext.Provider>;
}

export function Tabs({ children, className, ...props }: TabsProps){
    return <div role="tablist" {...props} className={cn(className, styles['tabs'])}>{children}</div>;
}

export default function TabsWithContext(
    { activeTab, onActiveTabChange, defaultActiveTab, children, ...props }: TabsWithContextProps
) {
    return <TabsContextProvider activeTab={activeTab} onActiveTabChange={onActiveTabChange} defaultActiveTab={defaultActiveTab}>
        <Tabs {...props}>{children}</Tabs>
    </TabsContextProvider>;
};
