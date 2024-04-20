<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-11 17:27:21
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-16 16:23:18
 * @FilePath: \vue3_admin_template\project\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-11 17:27:21
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-15 12:07:36
 * @FilePath: \vue3_admin_template\project\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  let primaryColor = localStorage.getItem("PRIMARYCOLOR");
  let html = document.documentElement;
  html.style.setProperty("--el-color-primary", primaryColor);
  localStorage.getItem("isDark")
    ? (html.className = "dark")
    : (html.className = "");
});
</script>

<style scoped lang="scss"></style>
