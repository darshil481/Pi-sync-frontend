import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import moment from "moment";
import { Store } from "@reduxjs/toolkit";

import { setToast, removeToast } from "../redux/slices/toastSlice";
import { API_URL } from "../config";


export const Axios: AxiosInstance = axios.create({
  baseURL: API_URL,
});

export const setupAxios = (store: Store) => {
  Axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    request.headers.set("utcOffset", moment().format("Z"));

    if (window?.Intl) {
      request.headers.set(
        "timezone",
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
    }

    const isJson =
      typeof request.data === "string" ||
      request.data instanceof URLSearchParams;

    request.headers.set("Content-Type", isJson ? "application/json" : "multipart/form-data");
    return request;
  });


  Axios.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log("✅ Axios Interceptor Response:", response); 
      const { toast } = response.data;
      
      if (toast && response.data.message) {
        const toastId = Date.now();
        console.log("==============jhsdy")
        store.dispatch(
          setToast({
            message: response.data.message,
            type: response.data.responseType || "success",
            id: toastId,
          })
        );

        setTimeout(() => {
          store.dispatch(removeToast({ id: toastId }));
        }, 2000);
      }

      return response.data;
    },
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      const responseType = error.response?.data?.responseType || "error";

      const isHandledError =
        [0, 400, 401, 403, 405, 500, 503].includes(status);

      if (isHandledError) {
        const toastId = Date.now();
        store.dispatch(
          setToast({
            message,
            type: responseType,
            id: toastId,
          })
        );

        setTimeout(() => {
          store.dispatch(removeToast({ id: toastId }));
        }, 3000);
      }

      throw error.response?.data ?? error.message;
    }
  );
};
