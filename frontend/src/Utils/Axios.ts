import axios from "axios";

import config from "../Configs/urls.config";

const AxiosInstance = axios.create({
  baseURL: config.base,
  timeout: 90000,
});

export default AxiosInstance;
