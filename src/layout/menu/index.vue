<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-18 20:05:25
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-16 17:28:33
 * @FilePath: \vue3_admin_template\project\src\layout\menu\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item v-if="item.meta.isShow" :index="item.path" @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="item.children[0].meta.isShow"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length >= 2">
      <el-sub-menu v-if="item.meta.isShow" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menus :menuList="item.children" :index="item.path"></Menus>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter();

defineProps(["menuList"]);
const goRoute = (vc: any) => {
  $router.push(vc.index);
};
</script>
<script lang="ts">
export default {
  name: "Menus",
};
</script>

<style scoped lang="scss">
.el-sub-menu {
  background-color: $base-menu-bgc;
}
</style>
