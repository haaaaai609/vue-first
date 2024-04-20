/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-14 00:21:57
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-12 12:21:50
 * @FilePath: \vue3_admin_template\project\utils\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  //超时时间
  timeout: 5000,
});
//请求拦截器
request.interceptors.request.use((config) => {
  // 仓库拿token放请求头发给服务，以获取用户信息
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  return config;
});
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //处理网络错误
    let msg = "";
    const status = error.response.status;
    switch (status) {
      case 401:
        msg = "token过期";
        break;
      case 403:
        msg = "无权访问";
        break;
      case 404:
        msg = "请求地址错误";
        break;
      case 500:
        msg = "服务器出现问题";
        break;
      default:
        msg = "无网络";
    }
    ElMessage({
      type: "error",
      message: msg,
    });
    return Promise.reject(error);
  },
);
export default request;
