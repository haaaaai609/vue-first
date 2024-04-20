<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-15 12:19:06
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-16 15:38:25
 * @FilePath: \vue3_admin_template\project\src\views\home\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-card ref="cardRef">
    <div style="display: flex">
      <img
        :src="userStore.avatar"
        alt=""
        style="
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 28px;
        "
      />
      <div>
        <h3 style="color: var(--el-color-primary)">
          {{ getTime() }}好{{ userStore.username }}
        </h3>
        <p>欢迎来到后台管理系统</p>
      </div>
    </div>
  </el-card>
  <div class="bottom" style="display: flex; justify-content: center">
    <svg-icon name="welcome" width="588px" height="500px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useUserStore from "@/store/modules/user";
import { getTime } from "@/../utils/time";
let userStore = useUserStore();
onMounted(() => {
  userStore.userinfo();
});
</script>

<style scoped></style>
