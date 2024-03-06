import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://reqres.in/api/",
  headers: {
    "Content-Type": "Access-Control-Allow-Origin",
  },
});

export default axiosInstance;
