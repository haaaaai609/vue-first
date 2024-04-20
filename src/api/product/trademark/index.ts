/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-23 17:57:39
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-25 15:29:52
 * @FilePath: \vue3_admin_template\project\src\api\product\trademark\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-23 17:57:39
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-24 23:52:43
 * @FilePath: \vue3_admin_template\project\src\api\product\trademark\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/../utils/request";
import { trademarkResData, recordsForm } from "./type";
// 统一管理接口
enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  ADDTRADEMAEK_URL = "/admin/product/baseTrademark/save",
  UPDATETRADEMAEK_URL = "/admin/product/baseTrademark/update",
  DELETE_URL = "/admin/product/baseTrademark/remove",
}

export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, trademarkResData>(API.TRADEMARK_URL + `${page}/${limit}`);
export const reqEditTrademark = (data: recordsForm) => {
  if (data.id) {
    // 如果有id，说明要修改
    return request.put<any, any>(API.UPDATETRADEMAEK_URL, data);
  } else {
    return request.post<any, any>(API.ADDTRADEMAEK_URL, data);
  }
};
export const reqDelete = (id: any) => {
  return request.delete<any, any>(API.DELETE_URL + `/${id}`, id);
};
