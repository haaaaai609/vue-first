/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-15 12:21:32
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-19 21:46:53
 * @FilePath: \vue3_admin_template\project\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoute } from "./Routes";
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});

export default router;
