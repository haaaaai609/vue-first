/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-25 11:48:14
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-26 10:33:43
 * @FilePath: \vue3_admin_template\project\src\api\product\attr\type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface responseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface dataForm {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}
export interface categoryResdata extends responseData {
  data: dataForm[];
}

export interface attrValueListForm {
  id?: number; //该属性值（标签）的id，请求添加属性时不需要参数
  valueName: string; //属性值（标签）名
  attrId?: number; //属性值(标签)所属属性的id，与下面id是一个东西
  flag?: boolean; //切换编辑与只读模式
}
export interface AttrListdataForm {
  id?: number; //属性id，请求添加属性时不需要参数
  attrName: string;
  categoryId: number | string; //该属性所属级别分类的id
  categoryLevel: number; //该属性所处分类的级别
  attrValueList: attrValueListForm[];
}
export interface AttrListForm extends responseData {
  data: AttrListdataForm[];
}
