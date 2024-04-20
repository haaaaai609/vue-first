/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-15 16:22:38
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-16 00:00:07
 * @FilePath: \vue3_admin_template\project\src\api\acl\permission\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/../utils/request";
import type { getPermissionRes, permissionDataForm } from "./type";
enum API {
  GERPERMISSION_URL = "/admin/acl/permission",
  DELETEPERMISSION_URL = "/admin/acl/permission/remove/",
  ADDPERMISSION_URL = "/admin/acl/permission/save",
  EDITPERMISSION_URL = "/admin/acl/permission/update",
}
export const reqPermission = () =>
  request.get<any, getPermissionRes>(API.GERPERMISSION_URL);
export const reqDeletePer = (id: number) =>
  request.delete<any, any>(API.DELETEPERMISSION_URL + `${id}`);
export const reqAddPermission = (addedPer: permissionDataForm) =>
  request.post<any, any>(API.ADDPERMISSION_URL, addedPer);
export const reqUpdatePermission = (editedPer: permissionDataForm) =>
  request.put<any, any>(API.EDITPERMISSION_URL, editedPer);
