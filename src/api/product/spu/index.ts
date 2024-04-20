/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-23 17:57:54
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-10 14:22:53
 * @FilePath: \vue3_admin_template\project\src\api\product\spu\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/../utils/request";
import type {
  recordsDataForm,
  getSpuRes,
  getTMlistRes,
  getSpuAttrRes,
  getSpuImageRes,
  AllSpuAttrRes,
} from "./type";
enum API {
  GETSPU_URL = "/admin/product/",
  DELETESPU_URL = "/admin/product/deleteSpu/",
  GETTRADEMARKLIST_URL = "/admin/product/baseCategoryTrademark/findTrademarkList/",
  GETSPUIMAGELIST_URL = "/admin/product/spuImageList/",
  GETSPUSALEATTRLIST_URL = "/admin/product/spuSaleAttrList/",
  GETALLSPUATTR_URL = "/admin/product/baseSaleAttrList",
  ADDSPU_URL = "/admin/product/saveSpuInfo",
  UPDATESPU_URL = "/admin/product/updateSpuInfo",
  GETSKULIST_URL = "/admin/product/findBySpuId/",
}
// 获取SPU接口
export const reqSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, getSpuRes>(
    API.GETSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  );

// 删除SPU接口
export const reqDeleteSpu = (spuId: number) =>
  request.delete<any, any>(API.DELETESPU_URL + `${spuId}`);
// 获取整个项目的spu属性

// 根据c3Id获取SPU品牌列表
export const reqGetTradeMarkList = (c3Id: string | number) =>
  request.get<any, getTMlistRes>(API.GETTRADEMARKLIST_URL + `${c3Id}`);
// 根据spuID获取照片墙
export const reqSpuImage = (spuId: any) =>
  request.get<any, getSpuImageRes>(API.GETSPUIMAGELIST_URL + `${spuId}`);
// 根据spuID获取销售属性
export const reqSpuSaleAttr = (spuId: any) =>
  request.get<any, getSpuAttrRes>(API.GETSPUSALEATTRLIST_URL + `${spuId}`);
//获取所有SPU属性
export const reqAllSpuAttr = () =>
  request.get<any, AllSpuAttrRes>(API.GETALLSPUATTR_URL);
// 编辑SPu（新增|修改）
export const reqEditSpu = (data: recordsDataForm) => {
  // 有id，修改
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data);
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
};
// 请求ksu列表
export const reqSkuList = (spuid: number | string) =>
  request.get<any, any>(API.GETSKULIST_URL + `${spuid}`);
