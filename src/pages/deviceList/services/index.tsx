import { AxiosRequestConfig } from "axios";

import { useAxiosPost as usePostAuthMutation } from "../../../hooks/useAxios";

const AUTH_API_BASE_PATH = "/device";

export const useGetDeviceListApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = usePostAuthMutation();

  const GetDeviceListApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${AUTH_API_BASE_PATH}/list`, data, config);
  };

  return { GetDeviceListApi, isLoading, isError, isSuccess };
};

export const useSyncDeviceApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = usePostAuthMutation();

  const syncDeviceApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`sync/add-event`, data, config);
  };

  return { syncDeviceApi, isLoading, isError, isSuccess };
};
