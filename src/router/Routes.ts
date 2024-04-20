/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-15 12:31:16
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 00:28:20
 * @FilePath: \vue3_admin_template\project\src\router\FirstRou.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-15 12:31:16
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-19 11:45:53
 * @FilePath: \vue3_admin_template\project\src\router\FirstRou.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const constantRoute = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: {
      title: "登录",
      isShow: false,
      icon: "DataLine",
    },
  },
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/layout/index.vue"),
    name: "layout",
    meta: {
      title: "",
      isShow: true,
      icon: "",
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          isShow: true,
          icon: "House",
        },
      },
    ],
  },
  // 数据大屏
  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "Screen",
    meta: {
      title: "数据大屏",
      isShow: true,
      icon: "Platform",
    },
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      isShow: false,
      icon: "DataLine",
    },
  },
];

export const asyncRoutes = [
  //权限管理
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    redirect: "/acl/user",
    name: "Acl",
    meta: {
      title: "权限管理",
      isShow: true,
      icon: "Lock",
    },
    children: [
      {
        path: "/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          isShow: true,
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          isShow: true,
          icon: "View",
        },
      },
      {
        path: "/acl/permission",
        component: () => import("@/views/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          title: "菜单管理",
          isShow: true,
          icon: "Menu",
        },
      },
    ],
  },
  //商品管理
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    redirect: "/product/attr",
    name: "Product",
    meta: {
      title: "商品管理",
      isShow: true,
      icon: "Lock",
    },
    children: [
      {
        path: "/product/attr",
        component: () => import("@/views/product/attr/index.vue"),
        name: "Product",
        meta: {
          title: "属性管理",
          isShow: true,
          icon: "ShoppingBag",
        },
      },
      {
        path: "/product/sku",
        component: () => import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "SKU管理",
          isShow: true,
          icon: "Postcard",
        },
      },
      {
        path: "/product/spu",
        component: () => import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "SPU管理",
          isShow: true,
          icon: "Postcard",
        },
      },
      {
        path: "/product/trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          isShow: true,
          icon: "CollectionTag",
        },
      },
    ],
  },
];

export const anyRoute = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
    meta: {
      title: "anyRoute",
      isShow: false,
      icon: "DataLine",
    },
  },
];
