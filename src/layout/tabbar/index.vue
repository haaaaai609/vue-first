<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-20 09:37:21
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-20 11:36:56
 * @FilePath: \vue3_admin_template\project\src\layout\tabbar\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="tabbar">
    <Left></Left>
    <Right></Right>
  </div>
</template>

<script setup lang="ts">
import Left from "./left/index.vue";
import Right from "./right/index.vue";
</script>
<script lang="ts">
export default {
  name: "Tabbar",
};
</script>
<style scoped lang="scss">
.tabbar {
  display: flex;
  height: $base-tabbar-height;
  justify-content: space-between;
}
</style>
