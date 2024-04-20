/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-17 19:49:44
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-21 14:21:07
 * @FilePath: \vue3_admin_template\project\utils\token.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//封装本地存储数据与读取数据方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
};
export const GET_TOKEN = () => {
  return localStorage.getItem("TOKEN");
};
export const REMOVE_TOKEN = () => {
  return localStorage.removeItem("TOKEN");
};
