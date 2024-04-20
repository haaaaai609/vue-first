<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-18 17:00:09
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-20 11:38:10
 * @FilePath: \vue3_admin_template\project\src\layout\Logo\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from "../../../src/setting";
</script>
<script lang="ts">
export default {
  name: "Logo",
};
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  height: $base-logo-height;
  padding: 0 6px;
  box-sizing: border-box;
  width: $base-menu-width;
}
img {
  width: 40px;
  height: 40px;
}
p {
  font-size: 25px;
  color: white;
  margin-left: 5px;
}
</style>
