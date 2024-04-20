<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-18 15:57:00
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-23 20:05:16
 * @FilePath: \vue3_admin_template\project\src\layout\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-18 15:57:00
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-19 21:44:24
 * @FilePath: \vue3_admin_template\project\src\layout\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="layout_container">
    <!-- 左侧导航栏 -->
    <div
      class="layout_slider"
      :class="{ fold: LayoutSettings.fold ? true : false }"
    >
      <Logo></Logo>
      <el-scrollbar>
        <el-menu
          :default-active="$route.path"
          background-color="$base-menu-bgc"
          text-color="white"
          :collapse="LayoutSettings.fold ? true : false"
        >
          <Menus :menuList="userStore.menuRoutes"></Menus>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航栏 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayoutSettings.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容区域 -->
    <div
      class="layout_main"
      :class="{ fold: LayoutSettings.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "./Logo/index.vue";
// 引入动态生成的菜单
import Menus from "./menu/index.vue";
//仓库中的路由数组
import useUserStore from "@/store/modules/user";
// 内容区组件
import Main from "./main/index.vue";
// 顶部栏组件
import Tabbar from "./tabbar/index.vue";
// 当前路由
import { useRoute } from "vue-router";
//引入仓库的fold控制菜单折叠
import useLayoutSettingStore from "@/store/modules/LayoutSetting";
let LayoutSettings = useLayoutSettingStore();
let userStore = useUserStore();
let $route = useRoute();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-bgc;
    box-sizing: border-box;
    transition: all 0.3s;

    &.fold {
      width: $base-menuFold-width;
    }

    .el-scrollbar {
      width: 100%;
      height: calc(100% - $base-logo-height);

      .el-menu {
        border: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0px;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - $base-menuFold-width);
      left: $base-menuFold-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    top: $base-tabbar-height;
    left: $base-menu-width;
    box-sizing: border-box;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - $base-menuFold-width);
      left: $base-menuFold-width;
    }
  }
}
</style>
<style lang="scss">
.el-menu {
  background-color: $base-menu-bgc;
}
</style>
