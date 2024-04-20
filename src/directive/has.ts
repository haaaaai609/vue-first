/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-19 01:17:58
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 01:45:16
 * @FilePath: \vue3_admin_template\project\src\directive\has.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import pinia from "@/store";
import useUserStore from "@/store/modules/user";
const userStore = useUserStore(pinia);
export const hasButton = (app: any) => {
  app.directive("has", {
    // el为此调用此事件的元素dom，options为dom名
    mounted(el: any, options: any) {
      // 如果用户的按钮权限中没有该dom名，则不显示该dom
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el);
      }
    },
  });
};
