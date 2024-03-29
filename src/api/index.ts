import axios, { type AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  timeout: 10000,
  baseURL: '/api',
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    if (response?.status === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  error => {
    let msg = '';
    if (error?.message?.includes?.('timeout')) {
      msg = '网络超时，请检查网络连接';
    }
    return Promise.reject(msg);
  },
);

const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig<unknown>,
  isMessage = false,
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      ...options,
    })
      .then(res => {
        //这里根据后端返回的数据格式做一些统一的处理
        if (res.data.code === 20000) {
          isMessage && ElMessage.success(res.data.message);
          resolve(res.data.data);
        } else {
          ElMessage.error(res.data.message);
          reject(res.data.data);
        }
      })
      .catch(err => {
        ElMessage.error(err);
        reject(err);
      });
  });
};
export { axiosInstance, request };
