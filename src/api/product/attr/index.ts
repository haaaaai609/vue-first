/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-23 17:57:58
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-26 14:25:11
 * @FilePath: \vue3_admin_template\project\src\api\product\attr\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/../utils/request";
import { categoryResdata, AttrListForm, AttrListdataForm } from "./type";
enum API {
  Category1_URL = "/admin/product/getCategory1",
  Category2_URL = "/admin/product/getCategory2/",
  Category3_URL = "/admin/product/getCategory3/",
  ArrtList_URL = "/admin/product/attrInfoList/",
  EditAttr_URL = "/admin/product/saveAttrInfo",
  DeleteAttr_URL = "/admin/product/deleteAttr/",
}

export const reqCategory1 = () => {
  return request.get<any, categoryResdata>(API.Category1_URL);
};
export const reqCategory2 = (category1Id: number | string) => {
  return request.get<any, any>(API.Category2_URL + `${category1Id}`);
};
export const reqCategory3 = (category2Id: number | string) => {
  return request.get<any, any>(API.Category3_URL + `${category2Id}`);
};
export const reqAttrList = (
  id1: number | string,
  id2: number | string,
  id3: number | string,
) => request.get<any, AttrListForm>(API.ArrtList_URL + `${id1}/${id2}/${id3}`);
export const reqEditAttr = (data: AttrListdataForm) =>
  request.post<any, any>(API.EditAttr_URL, data);
export const reqDeleteAttr = (id: number) =>
  request.delete<any, any>(API.DeleteAttr_URL + `${id}`);
