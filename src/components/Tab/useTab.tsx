import { useCallback } from "react";
import { UseTabProps } from "./types";
import { useOptionalTabListContext } from "@/components/TabList";

export default function useTab({ selected = false, value }: UseTabProps) {
    const tabListContext = useOptionalTabListContext();
    const isSelected = Boolean(selected || (tabListContext?.activeTab && tabListContext?.activeTab === value));
    const handleClick = useCallback(() => {
        if (!value) return;
        tabListContext?.setActiveTab(value);
    }, [tabListContext?.setActiveTab, value]);

    return {
        isSelected,
        handleClick,
    };
};