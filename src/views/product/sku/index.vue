<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-19 12:20:48
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 10:20:32
 * @FilePath: \vue3_admin_template\project\src\views\product\sku\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-card>
      <el-table border :data="skuEPageSkuList" height="588" style="width: 100%">
        <el-table-column type="index" label="序号" width="188" align="center" />
        <el-table-column
          prop="skuName"
          label="名称"
          width="188"
          align="center"
        />
        <el-table-column
          prop="skuDesc"
          label="描述"
          width="188"
          align="center"
        />
        <el-table-column label="默认图片" width="188" align="center">
          <template #default="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
          /></template>
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量（g）"
          width="188"
          align="center"
        />
        <el-table-column
          label="价格（元）"
          prop="price"
          width="188"
          align="center"
        />
        <el-table-column fixed="right" label="操作" width="288" align="center">
          <template #default="{ row, index }">
            <el-button
              :type="row.isSale ? 'info' : 'success'"
              size="small"
              :icon="row.isSale ? 'Bottom' : 'Top'"
              :title="row.isSale ? '点击下架' : '点击上架'"
              @click="TorB(row)"
            ></el-button>
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button
              type="primary"
              size="small"
              icon="View"
              @click="viewSku(row.id)"
            >
            </el-button>
            <!-- pop气泡框 -->
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确认删除?"
              icon="Delete"
              icon-color="#626AEF"
              @confirm="deleteSku(row.id, index)"
            >
              <template #reference>
                <el-button size="small" icon="Delete"> </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer v-model="showSelectSku" title="详细信息">
        <!-- 表格 -->
        <!-- 1行 -->
        <el-row>
          <el-col :span="6">名称</el-col>
          <el-col :span="18">华为mate60</el-col>
        </el-row>
        <!-- 2行 -->
        <el-row>
          <el-col :span="6">描述</el-col>
          <el-col :span="18">奥利力</el-col>
        </el-row>
        <!-- 3行 -->
        <el-row>
          <el-col :span="6">价格</el-col>
          <el-col :span="18">1888</el-col>
        </el-row>
        <!-- 4行 -->
        <el-row>
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18"
            ><el-tag
              v-show="sku.skuAttrValueList.length > 0"
              v-for="item in sku.skuAttrValueList"
              :key="item.id"
              style="margin: 5px 5px 5px 0"
              >{{ item.valueName }}</el-tag
            >
            <h3 v-show="sku.skuAttrValueList.length == 0">暂无平台属性</h3>
          </el-col>
        </el-row>
        <!-- 5行 -->
        <el-row>
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18"
            ><el-tag
              v-show="sku.skuSaleAttrValueList.length > 0"
              v-for="item in sku.skuSaleAttrValueList"
              :key="item.id"
              style="margin-right: 5px"
              >{{ item.saleAttrValueName }}</el-tag
            >
            <h3 v-show="sku.skuSaleAttrValueList.length == 0">暂无平台属性</h3>
          </el-col>
        </el-row>
        <!-- 轮播图 -->
        <el-carousel
          :interval="4000"
          type="card"
          height="200px"
          v-show="sku.skuImageList.length >= 1"
        >
          <el-carousel-item v-for="item in sku.skuImageList" :key="item.id">
            <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
          </el-carousel-item>
        </el-carousel>
        <img
          v-show="sku.skuImageList.length == 0"
          :src="sku.skuDefaultImg"
          alt=""
          style="width: 100px; height: 100px; margin-left: calc(50%-50px)"
        />
      </el-drawer>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="limit"
        :page-sizes="[6, 10, 16]"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin: 10px"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  reqSkuList,
  reqDeleteSku,
  reqSkuOnSale,
  reqSkuCancelSale,
  reqSKU,
} from "@/api/product/sku";
import { recordsForm } from "@/api/product/sku/type";
import { ElMessage } from "element-plus";
import { skuData } from "@/api/product/spu/type";
// 接收请求来的sku列表数据
let skuEPageSkuList = ref<recordsForm[]>([]);
let page = ref<number>(1);
let limit = ref<number>(10);
let currentPage = ref<number>(1);
let total = ref<any>(10);
// 查看sku
let showSelectSku = ref<boolean>(false);
// 接收请求来的单个sku
let sku = ref<recordsForm>({
  id: "",
  spuId: "",
  price: "",
  skuName: "",
  skuDesc: "",
  weight: "",
  tmId: "",
  category3Id: "",
  skuDefaultImg: "",
  isSale: "",
  skuImageList: [],
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
});
const getEPageSkuList = async (page: number, limit: number) => {
  let res = await reqSkuList(page, limit);
  if (res.code == 200) {
    total.value = res.data.total;
    currentPage.value = res.data.current;
    skuEPageSkuList.value = res.data.records;
  } else {
    ElMessage({
      type: "error",
      message: "获取sku失败",
    });
  }
};
const handleCurrentChange = () => {
  getEPageSkuList(currentPage.value, limit.value);
};
const handleSizeChange = (num: number) => {
  limit.value = num;
  getEPageSkuList(page.value, limit.value);
};
const deleteSku = async (skuid: number, index: number) => {
  let res = await reqDeleteSku(skuid);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    skuEPageSkuList.value.splice(index, 1);
    getEPageSkuList(page.value, limit.value);
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
// 商品上/下架
const TorB = async (sku: skuData) => {
  if (sku.isSale == 1) {
    await reqSkuCancelSale(sku.id);
    ElMessage({
      type: "info",
      message: "下架成功",
    });
    sku.isSale = 0;
  } else {
    await reqSkuOnSale(sku.id);
    ElMessage({
      type: "success",
      message: "上架成功",
    });
    sku.isSale = 1;
  }
};
// 查看某个sku
const viewSku = async (skuId: number) => {
  showSelectSku.value = true;
  let res = await reqSKU(skuId);
  if (res.code == 200) {
    sku.value = res.data;
    console.log(sku.value);
  } else {
    ElMessage({
      type: "error",
      message: "获取数据失败",
    });
  }
};
onMounted(() => {
  getEPageSkuList(page.value, limit.value);
});
</script>

<style scoped lang="scss">
.el-row {
  margin: 10px 0;
}
</style>
