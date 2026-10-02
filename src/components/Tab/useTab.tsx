import { UseTabProps } from "./types";

export default function useTab ({ selected = false }: UseTabProps) {
    return {
        isSelected: selected,
    };
};