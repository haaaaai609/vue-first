/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-17 19:40:21
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-25 16:20:08
 * @FilePath: \vue3_admin_template\project\src\store\modules\type\type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { dataForm } from "@/api/product/attr/type";
import { RouteRecordRaw } from "vue-router";
//定义小仓库数据state类型
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
  buttons: string[];
}
export interface categoryState {
  c1Id: number | string;
  c1Arr: dataForm[];
  c2Id: number | string;
  c2Arr: dataForm[];
  c3Id: number | string;
  c3Arr: dataForm[];
}
