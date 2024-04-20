<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-17 14:13:55
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-18 10:01:12
 * @FilePath: \vue3_admin_template\project\src\views\screen\component\left\lcenter\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main">
    <p class="title">男女比例</p>
    <p class="title-bottom"></p>
    <div class="picture">
      <div class="man-pic">
        <p>男士</p>
        <img src="../../../images/man.png" alt="" />
      </div>
      <div class="woman-pic">
        <p>女士</p>
        <img src="../../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <span>男士68%</span>
      <span>女士32%</span>
    </div>
    <div class="bar" ref="bar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let bar = ref();
onMounted(() => {
  let mycharts = echarts.init(bar.value);
  mycharts.setOption({
    title: {
      text: "男女比例",
      show: false,
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    series: [
      {
        type: "bar",
        data: [62],
        barWidth: 20,
        z: 3,
        itemStyle: {
          color: "skyblue",
          borderRadius: 20,
        },
      },
      {
        type: "bar",
        data: [100],
        barWidth: 20,
        barGap: "-100%",
        itemStyle: {
          color: "pink",
          borderRadius: 20,
        },
      },
    ],
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
});
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  background: url(../../../images/dataScreen-main-lt.png) no-repeat;
  background-size: cover;
  .title {
    margin: 0;
    font-size: 20px;
    color: white;
  }
  .title-bottom {
    width: 68px;
    height: 7px;
    margin: 5px 0 0 0;
    background: url(../../../images/dataScreen-title.png) no-repeat;
  }
  .picture {
    display: flex;
    justify-content: space-between;
    width: 68%;
    height: 38%;
    margin: 38px auto 0;
    .man-pic {
      width: 45%;
      height: 100%;
      background: url(../../../images/man-bg.png) no-repeat;
      background-size: cover;
      position: relative;
      p {
        margin: 0;
        text-align: center;
        color: white;
      }
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -36%);
      }
    }
    .woman-pic {
      position: relative;
      width: 45%;
      height: 100%;
      background: url(../../../images/woman-bg.png) no-repeat;
      background-size: cover;
      p {
        margin: 0;
        text-align: center;
        color: white;
      }
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -36%);
      }
    }
  }
  .rate {
    width: 80%;
    margin-left: 10%;
    margin-top: 5%;
    display: flex;
    justify-content: space-between;
    span {
      color: white;
    }
  }
  .bar {
    width: 80%;
    height: 10%;
    margin-left: 10%;
  }
}
</style>
