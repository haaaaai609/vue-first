/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-23 17:58:41
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-24 18:40:21
 * @FilePath: \vue3_admin_template\project\src\api\product\trademark\type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface recordsForm {
  id?: number;
  tmName: string;
  logoUrl: string;
}

export interface trademarkResData {
  code: number;
  message: string;
  data: {
    records: recordsForm[];
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    searchCount: boolean;
    pages: number;
  };
  ok: boolean;
}
