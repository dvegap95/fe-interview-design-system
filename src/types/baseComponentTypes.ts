import { ReactNode } from "react";

export type BaseComponentProps = {
    children?: ReactNode;
    id?: string;
    className?: string;
};