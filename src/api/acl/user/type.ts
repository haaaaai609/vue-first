/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-11 15:02:22
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-12 11:05:33
 * @FilePath: \vue3_admin_template\project\src\api\acl\user\type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface resBase {
  code: number;
  message: string;
  ok: boolean;
}
// 请求USER列表返回的内容
export interface reqUserListRes extends resBase {
  data: dataForm;
}
export interface dataForm {
  records: recordsDataForm[];
  total: number;
  size: number;
  current: number;
  orders: [];
  optimizeCountSql: boolean;
  hitCount: boolean;
  countId: null;
  maxLimit: null;
  searchCount: boolean;
  pages: number;
}
// 单个用户
export interface recordsDataForm {
  id?: number | string;
  createTime?: string;
  updateTime?: string;
  username: string;
  password: string;
  name: string;
  phone?: null;
  roleName?: string;
}
// 请求用户角色返回数据
export interface getUserRolesRes extends resBase {
  data: {
    assignRoles: rolesDataForm[];
    allRolesList: rolesDataForm[];
  };
}
export interface rolesDataForm {
  id: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark?: null;
}
// 给用户分配角色需要发给服务器的数据
export interface distributeRolesLoadForm {
  roleIdList: number[];
  userId: number | string;
}
