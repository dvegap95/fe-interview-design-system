import { BaseComponentProps } from "@/types/baseComponentTypes";

export type TabProps = BaseComponentProps & {
    variant?: 'pill' | 'underline';
    selected?: boolean;
    size?: 'sm' | 'md'; // sm = mobile:True
    value?: string;
};

export type UseTabProps = Omit<TabProps, 'children'>;