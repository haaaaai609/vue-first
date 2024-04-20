/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-13 21:11:24
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-15 16:04:20
 * @FilePath: \vue3_admin_template\project\src\api\acl\role\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/../utils/request";
import { RoleDataForm, getRoleListRes, getJurRes } from "./type";
enum API {
  GETROLESLIST_URL = "/admin/acl/role/",
  ADDROLE_URL = "/admin/acl/role/save",
  EDITROLE_URL = "/admin/acl/role/update",
  DELEROLE_URL = "/admin/acl/role/remove/",
  BATCHESDELROLES_URL = "/admin/acl/role/batchRemove",
  GETROLEJUR_URL = "/admin/acl/permission/toAssign/",
  SETJUR_URL = "/admin/acl/permission/doAssign",
}
export const reqRolesList = (page: number, limit: number, roleName: string) =>
  request.get<any, getRoleListRes>(
    API.GETROLESLIST_URL + `${page}/${limit}/?roleName=${roleName}`,
  );
export const reqAddRole = (addRoleInfo: RoleDataForm) =>
  request.post<any, any>(API.ADDROLE_URL, addRoleInfo);
export const reqEditRole = (editRoleInfo: RoleDataForm) =>
  request.put<any, any>(API.EDITROLE_URL, editRoleInfo);
export const reqDeleteRole = (roleid: number) =>
  request.delete<any, any>(API.DELEROLE_URL + `${roleid}`);
export const reqBatchesDelRoles = (idlist: number[]) =>
  request.delete<any, any>(API.BATCHESDELROLES_URL, { data: idlist });
export const reqRoleJurisdiction = (roleid: number) =>
  request.get<any, getJurRes>(API.GETROLEJUR_URL + `${roleid}`);
export const reqSetJur = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.SETJUR_URL + `/?roleId=${roleId}&permissionId=${permissionId}`,
  );
