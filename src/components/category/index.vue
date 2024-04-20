<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-25 11:28:43
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 10:12:31
 * @FilePath: \vue3_admin_template\project\src\components\category\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-card>
    <!-- 表单 -->
    <el-form
      :inline="true"
      style="display: flex; justify-content: space-between"
    >
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handleSelect1"
          :disabled="scene"
        >
          <!-- value为收集的数据， -->
          <el-option
            v-for="item in categoryStore.c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          @change="handleSelect2"
          :disabled="scene"
        >
          <el-option
            v-for="item in categoryStore.c2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" :disabled="scene">
          <el-option
            v-for="item in categoryStore.c3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useCategoryStore from "@/store/modules/category.ts";
let categoryStore = useCategoryStore();
onMounted(() => {
  categoryStore.getC1();
});
const handleSelect1 = () => {
  categoryStore.getC2();
  categoryStore.c2Id = "";
  categoryStore.c3Id = "";
};
const handleSelect2 = () => {
  categoryStore.getC3();
  categoryStore.c3Id = "";
};
defineProps(["scene"]);
</script>

<style scoped lang="scss">
.el-select {
  width: 220px;
}
</style>
