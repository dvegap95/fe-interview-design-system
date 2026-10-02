import { useMemo, useState } from "react";
import { TabListContextType, UseTabListContextProviderProps, UseTabListProps } from "./types";


export function useTabListContextProvider(props: UseTabListContextProviderProps): TabListContextType {
    const [activeTab, setActiveTab] = useState(props.defaultActiveTab ?? '');
    const contextValue = useMemo(() => ({
        activeTab: props.activeTab ?? activeTab ?? '',
        setActiveTab: props.onActiveTabChange ?? setActiveTab,
    }), [props.activeTab, props.onActiveTabChange, activeTab, setActiveTab]);

    return contextValue;
}

export default function useTabList (_props: UseTabListProps = {}) {
    return {};
};
