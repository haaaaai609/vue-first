<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-19 11:57:54
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-18 22:12:32
 * @FilePath: \vue3_admin_template\project\src\views\screen\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <div class="main" ref="main">
      <!-- 顶部 -->
      <div class="top">
        <top />
      </div>
      <!-- 底下 -->
      <div class="bottom">
        <!-- 左边 -->
        <div class="left">
          <left />
        </div>
        <!-- 中间 -->
        <div class="center"><center /></div>
        <!-- 右边 -->
        <div class="right"><left /></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import top from "./component/top/index.vue";
import left from "./component/left/index.vue";
import center from "./component/center/index.vue";
// import right from "./component/right/index.vue";
let main = ref();
onMounted(() => {
  main.value.style.transform = `scale(${scaling()}) translate(-50%,-50%)`;
});
// 计算缩放比例
const scaling = (w = 1920, h = 1080) => {
  const wScale = window.innerWidth / w;
  const hScale = window.innerHeight / h;
  return wScale > hScale ? hScale : wScale;
};
window.onresize = () => {
  main.value.style.transform = `scale(${scaling()}) translate(-50%,-50%)`;
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 100vw;
  height: 100vh;
  background: url("./images/bg.png") no-repeat;
  background-size: cover;
  .main {
    position: fixed;
    width: 1920px;
    height: 1080px;
    transform-origin: top left;
    left: 50%;
    top: 50%;
    .top {
      height: 40px;
    }
    .bottom {
      width: 100%;
      display: flex;
      .left {
        flex: 1;
        height: 1040px;
      }
      .center {
        flex: 2;
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>
