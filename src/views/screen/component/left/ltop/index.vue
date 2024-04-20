<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-04-17 14:11:53
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-17 21:30:25
 * @FilePath: \vue3_admin_template\project\src\views\screen\component\left\ltop\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main">
    <p class="title">实时游客统计</p>
    <p class="title-bottom"></p>
    <p class="totalorder">可预约总量<span class="total">999999</span>人</p>
    <!-- 实时人数 -->
    <div class="RTcount">
      <span class="countTotal" v-for="(item, index) in RTCount" :key="index">{{
        item
      }}</span>
    </div>
    <!-- 水球 -->
    <div class="waterBall" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill";
let RTCount = ref("218659人");
// 获取节点
let charts = ref();
// 获取实例对象
onMounted(() => {
  nextTick(() => {
    let mycharts = echarts.init(charts.value);
    mycharts.setOption({
      title: {
        text: "预约量",
        left: "center",
        top: "50px",
        textStyle: {
          color: "white",
        },
      },
      series: [
        // 水球
        {
          type: "liquidFill", //系列
          data: [0.38, 0.35, 0.3], //数据
          waveAnimation: true, //动画
          animationDuration: 1, //
          animationDurationUpdate: 0, //
          radius: "90%", //半径
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0, //0%时的颜色 从上往下看 最上面是0%
                color: "rgb(45, 238, 187)",
              },
              {
                offset: 1, //100%时的颜色 从上往下看 最上面是0%
                color: "rgb(38, 138, 182)",
              },
            ]),
          },
          backgroundStyle: {
            opacity: 0.38,
            color: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(255, 255, 0, 0)", // 0% 处的颜色
                },
                {
                  offset: 0.8,
                  color: "rgba(255, 255, 0, 0)",
                },
                {
                  offset: 1,
                  color: "rgb(0, 228, 200)", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
          outline: {
            show: false,
            // borderDistance: 10,
            // itemStyle: {
            //   borderWidth: 8,
            //   borderColor: "rgb(39, 221, 210)",
            // },
          },
        },
      ],
    });
  });
});
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  background: url(../../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100% 100%;
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
  .totalorder {
    float: right;
    margin-top: -5px;
    color: aliceblue;
    .total {
      color: rgb(195, 113, 83);
    }
  }
  .RTcount {
    width: 90%;
    height: 58px;
    display: flex;
    margin: 0 auto;
    .countTotal {
      flex: 1;
      background: url(../../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: white;
      font-size: 30px;
      line-height: 58px;
      text-align: center;
    }
  }
  .waterBall {
    width: 100%;
    height: 60%;
    margin-top: 10px;
  }
}
</style>
