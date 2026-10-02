import { useCallback, useEffect } from "react";
import { UseTabProps } from "./types";
import { useOptionalTabListContext } from "@/components/TabList";
import { CONFLICT_WARNING } from "./constants";

export default function useTab({ selected = false, value }: UseTabProps) {
    const tabListContext = useOptionalTabListContext();
    const isSelected = Boolean(selected || (tabListContext?.activeTab && tabListContext?.activeTab === value));
    const handleClick = useCallback(() => {
        if (!value) return;
        tabListContext?.setActiveTab(value);
    }, [tabListContext?.setActiveTab, value]);

    useEffect(() => {
        if (selected && tabListContext?.activeTab) {
            console.warn(CONFLICT_WARNING);
        }
    }, [selected, value, tabListContext?.setActiveTab]);

    return {
        isSelected,
        handleClick,
    };
};