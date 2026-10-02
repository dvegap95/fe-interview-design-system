import { useMemo, useState } from "react";
import { TabsContextType, UseTabsContextProviderProps, UseTabsWithContextProps } from "./types";


export function useTabsContextProvider(props: UseTabsContextProviderProps): TabsContextType {
    const [activeTab, setActiveTab] = useState(props.defaultActiveTab ?? '');
    const contextValue = useMemo(() => ({
        activeTab: props.activeTab ?? activeTab ?? '',
        setActiveTab: props.onActiveTabChange ?? setActiveTab,
    }), [props.activeTab, props.onActiveTabChange, activeTab, setActiveTab]);

    return contextValue;
}

export default function useTabsWithContext (_props: UseTabsWithContextProps = {}) {
    return {};
};
