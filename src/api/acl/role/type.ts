/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-13 21:11:28
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-15 14:36:16
 * @FilePath: \vue3_admin_template\project\src\api\acl\role\type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface resBase {
  code: number;
  message: string;
  ok: boolean;
}
export interface getRoleListRes extends resBase {
  data: dataForm;
}
export interface dataForm {
  records: RoleDataForm[];
  total: number;
  size: number;
  current: number;
  orders: [];
  optimizeCountSql: boolean;
  hitCount: boolean;
  countId: null;
  maxLimit: null;
  searchCount: true;
  pages: number;
}
export interface RoleDataForm {
  id?: number | string;
  roleName: string;
  remark?: null;
}
// 请求权限返回
export interface getJurRes extends resBase {
  data: jurList;
}
export interface jurDataForm {
  id: number;
  pid: number;
  name: string;
  code: null;
  toCode: null;
  type: number;
  status: null;
  level: number;
  children?: jurList;
  select: boolean;
}
export type jurList = jurDataForm[];
