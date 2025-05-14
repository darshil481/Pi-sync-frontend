import React, { useEffect, useState } from "react";
import { useGetDeviceListApi, useSyncDeviceApi } from "./services";
import { Table } from "../../components/table";
import SnipperLoader from "../../components/loader/snipper";

interface Device {
  id: string;
  deviceId: string;
  lastSync: string;
  syncStatus: "Pending" | "Success" | "Failed";
}

const DeviceList: React.FC = () => {
  const { syncDeviceApi, isLoading: syncLoader } = useSyncDeviceApi();
  const { GetDeviceListApi, isLoading } = useGetDeviceListApi();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async (page: number = 1, pageSize: number = 10) => {
    const formdata = new FormData();
    formdata.append("page", String(page));
    formdata.append("limit", String(pageSize));

    try {
      const { data, error } = await GetDeviceListApi(formdata);

      if (data.data && !error) {
        setDevices(
          data.data.map((element: Device) => ({
            id: element.id,
            deviceId: element.deviceId,
            lastSync: new Date(element.lastSync).toLocaleString(),
            syncStatus: element.syncStatus,
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
  const handleSyncDevice = async (device: Device) => {
    try {
      const formdata = new FormData();
      formdata.append("deviceId", device.deviceId);
      await syncDeviceApi(formdata);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchDevices(page);
  };

  const columns = [
    { key: "id", title: "Device ID" },
    { key: "lastSync", title: "Last Sync" },
    { key: "syncStatus", title: "Sync Status" },
    { key: "sync", title: "Action" },
    {
      key: "actions",
      title: "Actions",
      render: (_: any, item: any) => (
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => handleSyncDevice(item)}
        >
          Sync Now
        </button>
      ),
    },
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
                fetchDevices(1);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded shadow-sm transition"
            >
              Refresh
            </button>
          </div>
          <Table
            data={devices}
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

export default DeviceList;
