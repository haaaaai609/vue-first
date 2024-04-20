<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-27 23:37:04
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 10:21:53
 * @FilePath: \vue3_admin_template\project\src\views\product\spu\AddSku.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-form>
    <el-form-item label="sku名称">
      <el-input v-model="ADDSKU.skuName" placeholder="sku名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model="ADDSKU.price" placeholder="价格(元)"> </el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input v-model="ADDSKU.weight" placeholder="重量(克)"> </el-input>
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input
        v-model="ADDSKU.skuDesc"
        type="textarea"
        placeholder="sku描述"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form
        :inline="true"
        style="display: flex; flex-wrap: wrap; justify-content: space-between"
      >
        <el-form-item
          v-for="item in AttrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select
            v-model="item.IdAndValueId"
            style="width: 188px; margin-bottom: 10px"
          >
            <el-option
              v-for="opt in item.attrValueList"
              :key="opt.id"
              :label="opt.valueName"
              :value="`${item.id}:${opt.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form>
        <el-form-item
          v-for="item in saleAttrArr"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select
            v-model="item.saleAttrIdAndValueId"
            style="width: 188px; margin-bottom: 10px"
          >
            <el-option
              v-for="opt in item.spuSaleAttrValueList"
              :key="opt.id"
              :label="opt.saleAttrValueName"
              :value="`${item.id}:${opt.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item>
      <el-table border :data="spuImageList" ref="table">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="图片" align="center">
          <template #defalult="{ row }">
            <img :src="row.imgUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button size="small" @click="setDefaultImg(row)"
              >设为默认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="cancelAddSku">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { reqAttrList } from "@/api/product/attr";
import { reqSpuImage, reqSpuSaleAttr } from "@/api/product/spu";
import { recordsDataForm } from "@/api/product/spu/type";
import useCategoryStore from "@/store/modules/category";
import { defineEmits } from "vue";
import type { addSkuForm } from "@/api/product/sku/type";
import { reqAddSku } from "@/api/product/sku";
import { ElMessage } from "element-plus";
let categoryStore = useCategoryStore();
// 平台属性
let AttrArr = ref<any>([]);
// 销售属性
let saleAttrArr = ref<any>([]);
// 照片墙数组
let spuImageList = ref<any>([]);
// el-table组件实例
let table = ref<any>();
// 新增的sku
let ADDSKU = ref<addSkuForm>({
  category3Id: "",
  price: "",
  spuId: "",
  tmId: "", //spu品牌id
  weight: "",
  skuDefaultImg: "",
  skuDesc: "",
  skuName: "",
  skuAttrValueList: [
    // {
    //   attrId: "",
    //   valueId:"",
    // }
  ], //平台属性
  skuSaleAttrValueList: [
    // {
    //   saleAttrId: "",
    //   saleAttrValueId:"",
    // }
  ], //销售属性
});
let $emit = defineEmits(["chang2Scene0"]);
const cancelAddSku = () => {
  $emit("chang2Scene0", 0);
};
const initAddSku = async (row: recordsDataForm) => {
  // 初始化添加的sku一些信息
  ADDSKU.value.category3Id = categoryStore.c3Id;
  ADDSKU.value.spuId = row.id as number;
  ADDSKU.value.tmId = row.tmId;
  // 获取平台属性
  let res1 = await reqAttrList(
    categoryStore.c1Id,
    categoryStore.c2Id,
    row.category3Id,
  );
  // 获取销售属性
  let res2 = await reqSpuSaleAttr(row.id);
  // 获取spu照片
  let res3 = await reqSpuImage(row.id);
  // 保存
  AttrArr.value = res1.data;
  saleAttrArr.value = res2.data;
  spuImageList.value = res3.data;
};
// 收集添加的sku完整数据
// 设置默认图片
const setDefaultImg = (row: any) => {
  // 点击时，所有复选框不勾选
  spuImageList.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false);
  });
  table.value.toggleRowSelection(row, true);
  ADDSKU.value.skuDefaultImg = row.imgUrl;
};
const save = async () => {
  ADDSKU.value.skuAttrValueList = AttrArr.value.reduce(
    (prev: any, next: any) => {
      if (next.IdAndValueId) {
        let [attrId, valueId] = next.IdAndValueId.split(":");
        prev.push({
          attrId,
          valueId,
        });
      }
      return prev;
    },
    [],
  );
  ADDSKU.value.skuSaleAttrValueList = saleAttrArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleAttrIdAndValueId) {
        let [saleAttrId, saleAttrValueId] =
          next.saleAttrIdAndValueId.split(":");
        prev.push({
          saleAttrId,
          saleAttrValueId,
        });
      }
      return prev;
    },
    [],
  );
  let res = await reqAddSku(ADDSKU.value);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "添加sku成功",
    });
    // 清空sku
    ADDSKU.value = {
      category3Id: "",
      price: "",
      spuId: "",
      tmId: "", //spu品牌id
      weight: "",
      skuDefaultImg: "",
      skuDesc: "",
      skuName: "",
      skuAttrValueList: [
        // {
        //   attrId: "",
        //   valueId:"",
        // }
      ], //平台属性
      skuSaleAttrValueList: [
        // {
        //   saleAttrId: "",
        //   saleAttrValueId:"",
        // }
      ], //销售属性
    };
    // 回到主页
    $emit("chang2Scene0", 0);
  } else {
    ElMessage({
      type: "error",
      message: "添加sku失败",
    });
  }
};
defineExpose({ initAddSku });
</script>

<style scoped lang="scss"></style>
