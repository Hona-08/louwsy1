import axios from "axios";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

axiosInstance.defaults.headers.common["Accept-Language"] =
  typeof window !== "undefined" ? localStorage.getItem("lang") : "en";

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) =>
    Promise.reject(
      (error.response &&
        error.response.data &&
        error.response.data.message &&
        error) ||
        "Something went wrong !!"
    )
);

export default axiosInstance;
