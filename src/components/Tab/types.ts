import { ReactNode } from "react";

export type TabProps = {
    children: ReactNode;
    variant?: 'pill' | 'outline';
    selected?: boolean;
};

export type UseTabProps = Omit<TabProps, 'children'>;