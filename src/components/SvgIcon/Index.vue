<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-13 21:19:00
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-13 23:42:08
 * @FilePath: \vue3_admin_template\project\src\components\svgIcon\Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
// 父组件传来的属性
defineProps({
  prefix: {
    type: String,
    default: "#icon-",
  },
  name: String,
  color: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
});
</script>

<style scoped></style>
