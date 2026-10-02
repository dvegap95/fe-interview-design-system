import { BaseComponentProps } from "@/types/baseComponentTypes";

export type TabProps = BaseComponentProps & {
    variant?: 'pill' | 'outline';
    selected?: boolean;
    size?: 'sm' | 'md'; // sm = mobile:True
};

export type UseTabProps = Omit<TabProps, 'children'>;