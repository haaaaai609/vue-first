/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-21 15:28:16
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 11:08:16
 * @FilePath: \vue3_admin_template\project\src\permission.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import router from "@/router";
import setting from "./setting";
// 加载进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });
// 引入大仓库
import pinia from "./store";
import useUserStore from "./store/modules/user";
const userStore = useUserStore(pinia);
router.beforeEach(async (to: any, from: any, next: any) => {
  NProgress.start();
  // 获取token以判断可访问哪些路由
  const token = userStore.token;
  if (token) {
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      // 判断是否有用户信息
      if (userStore.username) {
        next();
      } else {
        try {
          await userStore.userinfo();
          // 万一已经获取到用户数据，但刷新的是刚添加的异步路由，路由还没添加完，会undefined
          next({ ...to, replace: true });
        } catch (error) {
          // token过期/用户手动更改本地存储
          // 退出登录->数据清空
          userStore.logout();
          next({ path: "/login" });
        }
      }
    }
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.afterEach((to: any, from: any, next: any) => {
  NProgress.done();
  // 标题名
  document.title = `${setting.title}-${to.meta.title}`;
});
