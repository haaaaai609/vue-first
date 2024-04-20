<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-17 13:53:56
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-17 15:07:45
 * @FilePath: \vue3_admin_template\project\src\views\screen\component\left\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="l-main">
    <div class="top"><top /></div>
    <div class="center"><center /></div>
    <div class="bottom"><bottom /></div>
  </div>
</template>

<script setup lang="ts">
import top from "./ltop/index.vue";
import center from "./lcenter/index.vue";
import bottom from "./lbottom/index.vue";
</script>

<style scoped lang="scss">
.l-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 38px;
  box-sizing: border-box;
  .top {
    flex: 1.5;
    margin-top: 10px;
  }
  .center {
    flex: 1.25;
    margin-top: 28px;
  }
  .bottom {
    flex: 1.1;
    margin: 28px 0;
  }
}
</style>
