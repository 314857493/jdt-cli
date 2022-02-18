import axios from "axios";
import { ElMessage } from "element-plus";
import { goLogin } from "../utils";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: "/",
  timeout: 50 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    const { code } = response.data;
    if (code && code !== 1 && code !== 2000) {
      ElMessage.warning(
        response.data.message ||
          response.data.msg ||
          response.message ||
          response.msg
      );
    }
    return response.data;
  },
  (error) => {
    const { status, config, data } = error.response;
    if (config.url !== "/api/cms/system/login") {
      if (status === 401) {
        goLogin(data.data);
      } else {
        ElMessage.error(error.response.data);
      }
    }
    return Promise.reject(error);
  }
);
_axios.upload = (url, data) => {
  const form = new FormData();
  Object.keys(data).forEach((val) => {
    form.append(val, data[val]);
  });
  return _axios.post(url, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default _axios;
