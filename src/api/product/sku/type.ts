/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-02 14:20:09
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-11 11:41:21
 * @FilePath: \vue3_admin_template\project\src\api\product\sku\type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

//sku数据格式
export interface addSkuForm {
  category3Id: number | string;
  id?: number;
  isSale?: number;
  price: number | string;
  skuAttrValueList?: skuAttrValueListForm[];
  skuDefaultImg: string;
  skuDesc: string;
  skuImageList?: skuImageListForm[];
  skuName: string;
  skuSaleAttrValueList?: skuSaleAttrValueListFrom[];
  spuId: number | string;
  tmId: number | string;
  weight: string;
}
export interface skuImageListForm {
  id: number;
  imgName: string;
  imgUrl: string;
  isDefault: string;
  skuId: number;
  spuImgId: number;
}
export interface skuAttrValueListForm {
  attrId: number | string;
  attrName?: string;
  id?: number;
  skuId: number | string;
  valueId: number | string;
  valueName?: string;
}
export interface skuSaleAttrValueListFrom {
  id?: number | string;
  saleAttrId: number | string;
  saleAttrName?: string;
  saleAttrValueId: number | string;
  saleAttrValueName?: string;
  skuId?: number | string;
  spuId?: number | string;
}

// sku列表
export interface resBase {
  code: number;
  message: string;
  ok: boolean;
}
export interface dataForm {
  records: recordsForm[];
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
export interface recordsForm {
  id: number | string;
  spuId: number | string;
  price: number | string;
  skuName: string;
  skuDesc: string;
  weight: string;
  tmId: number | string;
  category3Id: number | string;
  skuDefaultImg: string;
  isSale: number | string;
  skuImageList: skuImageListForm[];
  skuAttrValueList: skuAttrValueListForm[];
  skuSaleAttrValueList: skuSaleAttrValueListFrom[];
}
// 获取sku列表返回的数据
export interface getSkuRes extends resBase {
  data: dataForm;
}
// 获取单个sku返回的数据
export interface getESkuRes extends resBase {
  data: recordsForm;
}
