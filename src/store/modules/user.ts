/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-17 00:08:14
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 01:26:27
 * @FilePath: \vue3_admin_template\project\src\store\modules\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//创建用户相关的小仓库;
import { defineStore } from "pinia";
import router from "@/router/index.ts";
import { reqLogin, reqLogout, reqUserInfo } from "@/api/user";
//引入类型
import type {
  loginDataForm,
  loginResponsedata,
  UserInfoResData,
} from "@/api/user/type";
import type { UserState } from "./type/type.ts";
//引入操作存储本地数据的文件
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "../../../utils/token";
// 引入路由
import { constantRoute, asyncRoutes, anyRoute } from "../../router/Routes.ts";
// 过滤异步路由函数
function filterAsyncRoutes(asyncRoutes: any, routes: any) {
  return asyncRoutes.filter((item: any) => {
    if (routes.includes(item)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoutes(item.children, routes);
      }
    }
    return true;
  });
}
//创建用户小仓库
const useUserStore = defineStore("User", {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要的路由（数组）
      username: "",
      avatar: "",
      buttons: [],
    };
  },
  //异步|逻辑的地方
  actions: {
    // 登录逻辑
    async userLogin(data: loginDataForm) {
      const res: loginResponsedata = await reqLogin(data);
      if (res.code == 200) {
        this.token = res.data as string;
        //本地存储持久化存储
        SET_TOKEN(res.data as string);
        return "ok";
      } else {
        return Promise.reject(new Error(res.data));
      }
    },
    // 存储用户信息逻辑
    async userinfo() {
      //获取用户信息
      const res: UserInfoResData = await reqUserInfo();
      if (res.code == 200) {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        this.buttons = res.data.buttons;
        // 拿到当前用户可访问的路由信息，进行过滤
        const cloneAsyncRoute = [...asyncRoutes];
        const userAsyncRoute = filterAsyncRoutes(
          cloneAsyncRoute,
          res.data.routes,
        );
        // console.log(asyncRoutes, cloneAsyncRoute); Acl+Product
        // 用户总共应该有的路由
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute];
        // console.log(this.menuRoutes);
        // 追加
        [...userAsyncRoute, ...anyRoute].forEach((route: any) => {
          router.addRoute(route);
        });
        // console.log(router.getRoutes());
        return "ok";
      } else {
        return Promise.reject("获取用户信息失败");
      }
    },

    async logout() {
      const res = await reqLogout();
      if (res.code == 200) {
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;
