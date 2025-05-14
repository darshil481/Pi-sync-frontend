import React, { useEffect, useState } from "react";
import { useGetErrorListApi } from "./services";
import { Table } from "../../components/table";
import SnipperLoader from "../../components/loader/snipper";

interface Error {
  id: string;
  deviceId: string;
  timestamp: string;
  message: string;
}

const ErrorList: React.FC = () => {
  const { GetErrorListApi, isLoading } = useGetErrorListApi();
  const [errors, setErrors] = useState<Error[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchErrors();
  }, []);

  const fetchErrors = async (page: number = 1, pageSize: number = 10) => {
    const formdata = new FormData();
    formdata.append("page", String(page));
    formdata.append("limit", String(pageSize));

    try {
      const { data, error } = await GetErrorListApi(formdata);

      if (data.data && !error) {
        setErrors(
          data.data.map((element: Error) => ({
            id: element.id,
            deviceId: element.deviceId,
            timestamp: new Date(element.timestamp).toLocaleString(),
            message: element.message,
          }))
        );
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch devices", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchErrors(page);
  };

  const columns = [
    { key: "deviceId", title: "Device ID" },
    { key: "message", title: "Error Message" },
    { key: "timestamp", title: "Last Attempt" },
  ];

  return (
    <div className="">
      {loading ? (
        <SnipperLoader />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Device List</h2>
            <button
              onClick={() => {
                setCurrentPage(1);
                fetchErrors(1);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded shadow-sm transition"
            >
              Refresh
            </button>
          </div>
          <Table
            data={errors}
            currentPage={currentPage}
            total={total}
            pageSize={pageSize}
            columns={columns}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ErrorList;
