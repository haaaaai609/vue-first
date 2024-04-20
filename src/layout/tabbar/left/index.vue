<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-20 11:04:39
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-20 17:14:39
 * @FilePath: \vue3_admin_template\project\src\layout\tabbar\left\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 左侧 -->
  <div class="tabbar-left">
    <!-- 收起菜单栏图标 -->
    <el-icon style="margin: 0 16px" @click="changIcon">
      <component :is="LayoutSettings.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <el-icon style="vertical-align: top">
          <component :is="item.meta.icon"></component>
        </el-icon>
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
//右箭头图标
import { ArrowRight } from "@element-plus/icons-vue";
//引入仓库的fold控制菜单折叠
import useLayoutSettingStore from "@/store/modules/LayoutSetting";
let LayoutSettings = useLayoutSettingStore();
const changIcon = () => {
  LayoutSettings.fold = !LayoutSettings.fold;
};
</script>

<style scoped lang="scss">
.tabbar-left {
  display: flex;
  height: 100%;
  align-items: center;
}
</style>
