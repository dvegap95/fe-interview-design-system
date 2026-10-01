import { TabProps } from "./types";

export default function Tab(
    { children }: TabProps
) {
    return <div role="tab">{children}</div>;
};