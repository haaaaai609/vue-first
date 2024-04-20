/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-15 16:22:42
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-15 16:28:11
 * @FilePath: \vue3_admin_template\project\src\api\acl\permission\type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface resBase {
  code: number;
  message: string;
  ok: boolean;
}
export interface getPermissionRes extends resBase {
  data: permissionArr;
}
export interface permissionDataForm {
  id?: number | string;
  createTime?: string;
  updateTime?: string;
  pid: number | string;
  name: string;
  code: string;
  toCode?: null;
  type?: number;
  status?: null;
  level: number | string;
  children?: permissionArr;
  select?: boolean;
}
export type permissionArr = permissionDataForm[];
