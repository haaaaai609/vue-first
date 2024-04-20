<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-20 11:04:44
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-16 16:24:51
 * @FilePath: \vue3_admin_template\project\src\layout\tabbar\right\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 右侧 -->
  <div class="tabbar-right">
    <!-- 仨图标 -->
    <el-button circle size="small" icon="Refresh" @click="goRefresh">
    </el-button>
    <el-button circle size="small" icon="FullScreen" @click="fullScreen">
    </el-button>
    <el-popover placement="top-start" trigger="click" content="主题设置">
      <el-form>
        <el-form-item label="暗黑模式">
          <el-switch
            v-model="switchFlag"
            inline-prompt
            active-icon="Moon"
            inactive-icon="Sunny"
            @click="SunnyOrDark"
          ></el-switch>
        </el-form-item>
        <el-form-item label="主题颜色">
          <el-color-picker
            v-model="color"
            show-alpha
            :predefine="predefineColors"
            :teleported="false"
            @change="setColor"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button class="m-2" icon="Setting" circle></el-button>
      </template>
    </el-popover>
    <!-- 头像 -->
    <img :src="userStore.avatar" alt="" />
    <!-- 昵称 -->
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import useLayoutSettingStore from "@/store/modules/LayoutSetting";
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
let $router = useRouter();
let userStore = useUserStore();
let LayoutSettings = useLayoutSettingStore();
// 如果为真，暗黑模式
let switchFlag = ref<boolean>(false);
// 刷新
const goRefresh = () => {
  LayoutSettings.refresh = !LayoutSettings.refresh;
};
// 全屏
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
const SunnyOrDark = () => {
  let html = document.documentElement;
  switchFlag.value ? (html.className = "dark") : (html.className = "");
  nextTick(() => {
    localStorage.setItem("isDark", switchFlag.value ? "1" : "");
  });
};

// 退出登录
const logOut = async () => {
  await userStore.logout();
  $router.push({ path: "/login" });
};
// 获取取色器颜色，通知js修改按钮颜色
const setColor = () => {
  const html = document.documentElement;
  html.style.setProperty("--el-color-primary", color.value);
  localStorage.setItem("PRIMARYCOLOR", color.value);
};
onMounted(() => {
  switchFlag.value = Boolean(localStorage.getItem("isDark"));
});
const color = ref("rgba(255, 69, 0, 0.68)");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
</script>
<script lang="ts">
export default {
  name: "Settings",
};
</script>
<style scoped lang="scss">
.tabbar-right {
  display: flex;
  height: 100%;
  align-items: center;
  img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin: 0 10px 0 20px;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
}
</style>
