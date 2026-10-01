import { ReactNode } from "react";

export type TabProps = {
    children: ReactNode;
    variant?: 'pill' | 'outline';
    selected?: boolean;
    size?: 'sm' | 'md'; // sm = mobile:True
    id?: string;
};

export type UseTabProps = Omit<TabProps, 'children'>;