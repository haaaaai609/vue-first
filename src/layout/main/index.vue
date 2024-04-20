<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-19 22:06:44
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-20 17:47:39
 * @FilePath: \vue3_admin_template\project\src\layout\main\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/LayoutSetting";
import { ref, watch, nextTick } from "vue";

let LayoutSettings = useLayoutSettingStore();
let flag = ref(true);
watch(
  () => LayoutSettings.refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>

<script lang="ts">
export default {
  name: "MainCop",
};
</script>

<style scoped>
.fade-enter {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
