import { ReactNode } from "react";

export type TabProps = {
    children: ReactNode;
    variant?: 'pill' | 'outline';
    selected?: boolean;
    size?: 'sm' | 'md'; // sm = mobile:True
};

export type UseTabProps = Omit<TabProps, 'children'>;