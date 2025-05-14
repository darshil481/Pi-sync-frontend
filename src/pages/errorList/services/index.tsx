import { AxiosRequestConfig } from "axios";

import { useAxiosPost as usePostAuthMutation } from "../../../hooks/useAxios";
import { useAxiosGet as useGetAuthMutation } from "../../../hooks/useAxios";;

const AUTH_API_BASE_PATH = "/error";

export const useGetErrorListApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = usePostAuthMutation();

  const GetErrorListApi = async (
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    return callApi(`${AUTH_API_BASE_PATH}/list`, data, config);
  };

  return { GetErrorListApi, isLoading, isError, isSuccess };
};
