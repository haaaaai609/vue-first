/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-23 17:57:50
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-11 11:19:01
 * @FilePath: \vue3_admin_template\project\src\api\product\sku\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/../utils/request";
import type { addSkuForm, getSkuRes, resBase, getESkuRes } from "./type";
enum API {
  ADDSKU_URL = "/admin/product/saveSkuInfo",
  GETSKULIST = "/admin/product/list/",
  DELETESKU_URL = "/admin/product/deleteSku/",
  SKUONSALE_URL = "/admin/product/onSale/",
  SKUCANCELSALE_URL = "/admin/product/cancelSale/",
  GETSKU_URL = "/admin/product/getSkuInfo/",
}
export const reqAddSku = (data: addSkuForm) =>
  request.post<any, resBase>(API.ADDSKU_URL, data);
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, getSkuRes>(API.GETSKULIST + `${page}/${limit}`);
export const reqDeleteSku = (skuid: number | string) =>
  request.delete<any, resBase>(API.DELETESKU_URL + `${skuid}`);
// 商品上架
export const reqSkuOnSale = (skuid: number | string) =>
  request.get<any, resBase>(API.SKUONSALE_URL + `${skuid}`);
// 商品下架
export const reqSkuCancelSale = (skuid: number | string) =>
  request.get<any, resBase>(API.SKUCANCELSALE_URL + `${skuid}`);
// 查看某个sku信息
export const reqSKU = (skuid: number | string) =>
  request.get<any, getESkuRes>(API.GETSKU_URL + `${skuid}`);
