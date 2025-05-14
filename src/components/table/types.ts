export type SortState = {
  column: string;
  order: SortOrder;
};
export type SortOrder = "asc" | "desc";
export type TableActionType =
  | "EXCEL"
  | "SORT"
  | "FILTER"
  | "DELETE"
  | "DRAG"
  | "TOGGLE"
  | "DROPDOWN"
  | "ARCHIVE";
