export const CONFLICT_WARNING = new Error(
  "`selected` forces selected appearance on this Tab only; it does not replace active-tab context for the list. Mixing `selected` with an activeTab can leave two tabs selected.",
);
