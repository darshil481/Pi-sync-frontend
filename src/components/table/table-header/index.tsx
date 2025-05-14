import React, { JSX } from "react";
import { ColumnType } from "..";

interface Props<T> {
  columns: ColumnType<T>[];
  showIndexColumn?: boolean;
}

export function TableHeader<T>({
  columns,
  showIndexColumn,
}: Props<T>): JSX.Element {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr className="">
        {showIndexColumn && (
          <th className="px-6 py-3">
            #
          </th>
        )}
        {columns.map((column, index) => (
          <th
            key={index}
            className="px-6 py-3"
          >
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
