/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-27 11:33:05
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-10 14:30:03
 * @FilePath: \vue3_admin_template\project\src\api\product\spu\type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface responseData {
  code: number;
  ok: boolean;
  message: string;
}
export interface recordsDataForm {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number | string;
  spuSaleAttrList: null | spuAttrData[];
  spuImageList: null | ImagesData[];
}
export interface spuDataForm {
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
// 获取spu请求返回的数据
export interface getSpuRes extends responseData {
  data: spuDataForm;
}

export interface TMlistData {
  id: number;
  tmName: string;
  logoUrl: string;
}
// 请求spu品牌列表返回数据
export interface getTMlistRes extends responseData {
  data: TMlistData[];
}

export interface ImagesData {
  id?: number;
  spuId?: number;
  imgName?: string;
  imgUrl?: string;
  name?: string;
  url?: string;
}
// 获取照片墙返回的数据
export interface getSpuImageRes extends responseData {
  data: ImagesData[];
}

// 属性值列表
export interface spuSaleAttrValueListData {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName?: string;
  isChecked?: null;
}
// 属性信息
export interface spuAttrData {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: spuSaleAttrValueListData[];
  // saleAttrValue相当于属性值的名字，拿来追加然后跟baseid合并后追加到属性列表的，只是一个过渡属性
  saleAttrValue?: string;
  flag?: boolean;
}
// 获取spu属性返回的数据
export interface getSpuAttrRes extends responseData {
  data: spuAttrData[];
}

export interface AllSpuAttrData {
  id: number;
  name: string;
}
// 获取所有SPU属性返回的数据
export interface AllSpuAttrRes extends responseData {
  data: AllSpuAttrData[];
}
// sku数据类型
export interface skuData {
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
  skuImageList: null;
  skuAttrValueList: null;
  skuSaleAttrValueList: null;
}
