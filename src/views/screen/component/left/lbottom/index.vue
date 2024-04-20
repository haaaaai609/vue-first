<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-17 14:13:50
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-18 12:26:06
 * @FilePath: \vue3_admin_template\project\src\views\screen\component\left\lbottom\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main">
    <p class="title">年龄比例</p>
    <p class="title-bottom"></p>
    <div class="age" ref="age"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let age = ref();
onMounted(() => {
  let mycharts = echarts.init(age.value);
  mycharts.setOption({
    legend: {
      orient: "vertical",
      left: "right",
      textStyle: {
        color: "white",
      },
      itemGap: 15,
    },

    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [20, 108],
        center: ["35%", "55%"],
        roseType: "area",
        label: {
          normal: {
            show: true,
            position: "inside", // 设置标签位置为扇形内部
            textStyle: {
              color: "white", // 设置字体颜色为黑色
            },
            formatter: "{d}%",
          },
        },
        itemStyle: {
          borderRadius: 8,
          borderWidth: 2,
          borderColor: "white",
        },
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        data: [
          { value: 50, name: "10岁以下" },
          { value: 40, name: "10-20岁" },
          { value: 32, name: "21-30岁" },
          { value: 30, name: "31-40岁" },
          { value: 28, name: "41-50岁" },
          { value: 26, name: "51-60岁" },
          { value: 22, name: "60岁以上" },
        ],
      },
    ],
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
  .age {
    width: 88%;
    height: 88%;
    margin-left: 10%;
  }
}
</style>
