import React, { JSX } from "react";
import { TableHeader } from "./table-header";
import { TableBody } from "./table-body";
import Pagination from "./pagination";

export interface ColumnType<T> {
  key: keyof T | string;
  title: string;
  render?: (column: ColumnType<T>, item: T, index: number) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: ColumnType<T>[];
  showIndexColumn?: boolean;
  onRowClick?: (row: T) => void;
  pageSize: number;
  currentPage: number;
  total: number;
  handlePageChange: (page: number) => void;
}

export function Table<T>({
  data,
  columns,
  showIndexColumn = false,
  onRowClick,
  pageSize,
  currentPage,
  total,
  handlePageChange,
}: TableProps<T>): JSX.Element {
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="relative flex flex-col w-full h-full  text-gray-700 bg-white shadow-md rounded-l bg-clip-border">
      <table className="ww-full text-left table-auto min-w-max">
        <TableHeader columns={columns} showIndexColumn={showIndexColumn} />
        <TableBody
          data={data}
          columns={columns}
          handleRowClick={onRowClick}
          showIndexColumn={showIndexColumn}
        />
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
