import { UseTabProps } from "./types";

export const useTab = ({ selected = false }: UseTabProps) => {
    return {
        isSelected: selected,
    };
};