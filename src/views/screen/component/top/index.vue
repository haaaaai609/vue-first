<template>
  <div class="top">
    <div class="top-left"><span class="lbn" @click="goHome">首页</span></div>
    <div class="top-center">
      <div class="title">智慧旅游可视化大数据展示平台</div>
    </div>
    <div class="top-right">
      <span class="rbn">统计报告</span> <span class="date">{{ date }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
let date = ref(moment().format("YYYY-MM-DD hh:mm:ss"));
let $router = useRouter();
const goHome = () => {
  $router.push("./home");
};
onMounted(() => {
  setInterval(() => {
    date.value = moment().format("YYYY-MM-DD hh:mm:ss");
  }, 1000);
});
</script>

<style scoped lang="scss">
.top {
  display: flex;
  width: 100%;
  .top-left {
    display: flex;
    justify-content: flex-end;
    float: left;
    flex: 2;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: contain;
    .lbn {
      width: 20%;
      height: 33px;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: contain;
      text-align: center;
      line-height: 33px;
      font-size: 20px;
      color: #29fcff;
    }
    .lbn:hover {
      cursor: pointer;
    }
  }
  .top-center {
    height: 40px;
    flex: 3;
    .title {
      height: 73px;
      width: 100%;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      line-height: 73px;
      text-align: center;
      font-size: 30px;
      color: #29fcff;
    }
  }
  .top-right {
    display: flex;
    justify-content: space-between;
    flex: 2;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: contain;
    .rbn {
      width: 20%;
      height: 36px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: contain;
      text-align: center;
      line-height: 33px;
      font-size: 20px;
      color: #29fcff;
    }
    .rbn:hover {
      cursor: pointer;
    }
    .date {
      height: 36px;
      line-height: 36px;
      color: #29fcff;
    }
  }
}
</style>
