/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-11 15:02:17
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-13 21:12:14
 * @FilePath: \vue3_admin_template\project\src\api\acl\user\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/../utils/request";
import type {
  recordsDataForm,
  reqUserListRes,
  resBase,
  getUserRolesRes,
  distributeRolesLoadForm,
} from "./type";
enum API {
  GETUSERLIST_URL = "/admin/acl/user/",
  DELETEUSER_URL = "/admin/acl/user/remove/",
  ADDUSER_URL = "/admin/acl/user/save",
  UPDATEUSER_URL = "/admin/acl/user/update",
  GETUSERROLES_URL = "/admin/acl/user/toAssign/",
  DISTRIBUTEROLES_URL = "/admin/acl/user/doAssignRole",
  DELETEUSERSBYIDLIST_URL = "/admin/acl/user/batchRemove",
}
// 请求用户数据列表
export const reqUserList = (page: number, limit: number, name: string) =>
  request.get<any, reqUserListRes>(
    API.GETUSERLIST_URL + `${page}/${limit}/?name=${name}`,
  );
// 请求删除用户
export const reqDeleteUser = (userid: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + `${userid}`);
// 请求添加用户
export const reqAddUser = (userinfo: recordsDataForm) =>
  request.post<any, any>(API.ADDUSER_URL, userinfo);
// 请求修改用户数据
export const reqUpdateUser = (userinfo: recordsDataForm) =>
  request.put<any, resBase>(API.UPDATEUSER_URL, userinfo);
// 请求用户角色
export const reqUserRoles = (userid: number | string) =>
  request.get<any, getUserRolesRes>(API.GETUSERROLES_URL + `${userid}`);
// 请求分配角色
export const reqDistributeRoles = (
  distributeRolesLoad: distributeRolesLoadForm,
) => request.post<any, any>(API.DISTRIBUTEROLES_URL, distributeRolesLoad);
// 根据用户id列表批量删除用户
export const reqBatchesDeleteUsers = (idList: number[]) =>
  request.delete<any, any>(API.DELETEUSERSBYIDLIST_URL, { data: idList });
