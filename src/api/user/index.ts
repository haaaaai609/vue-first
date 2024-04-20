/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-15 11:19:24
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-23 18:01:35
 * @FilePath: \vue3_admin_template\project\src\api\user\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEi
 */

import request from "../../../utils/request";
//接口类型
import { loginDataForm, loginResponsedata, UserInfoResData } from "./type";
// 统一管理接口
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}
//登录接口
export const reqLogin = (data: loginDataForm) =>
  request.post<any, loginResponsedata>(API.LOGIN_URL, data);

//获取用户信息接口
export const reqUserInfo = () =>
  request.get<any, UserInfoResData>(API.USERINFO_URL);

// 退登接口
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);
