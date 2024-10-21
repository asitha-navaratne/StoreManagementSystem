import axios from "axios";

import config from "../Configs/urls.config";

const AxiosInstance = axios.create({
  baseURL: config.base,
  timeout: 30000,
});

export default AxiosInstance;
