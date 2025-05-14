import React, { JSX } from "react";
import { ColumnType } from "..";

interface TableBodyProps<T> {
  data: T[];
  columns: ColumnType<T>[];
  handleRowClick?: (row: T) => void;
  showIndexColumn?: boolean;
}

export function TableBody<T>({
  data,
  columns,
  handleRowClick,
  showIndexColumn,
}: TableBodyProps<T>): JSX.Element {
  return (
    <tbody >
      {data.map((item, index) => (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          onClick={() => handleRowClick?.(item)}
        >
          {showIndexColumn && (
            <td className="px-6 py-4">
              {index + 1}
            </td>
          )}
          {columns.map((column, colIndex) => (
            <td
              key={colIndex}
              className="px-6 py-4"
            >
              {column.render
                ? column.render(column, item, index)
                : String(item[column.key as keyof T] ?? "")}
            </td>
          ))}
        </tr>
      ))}
      {data.length === 0 && (
        <tr>
          <td
            colSpan={columns.length + (showIndexColumn ? 1 : 0)}
            className="text-center text-gray-500 py-6"
          >
            No data available.
          </td>
        </tr>
      )}
    </tbody>
  );
}
