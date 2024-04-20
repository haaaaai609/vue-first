<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-19 12:20:31
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 12:36:54
 * @FilePath: \vue3_admin_template\project\src\views\product\spu\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <!-- 场景 0-->
      <!-- 表格页 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="Plus"
          style="margin-bottom: 10px"
          :disabled="categoryStore.c3Id ? false : true"
          @click="AddSpuClick"
        >
          添加SPU
        </el-button>
        <el-table border :data="spuArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="SPU名称"
            width="100px"
            prop="spuName"
          ></el-table-column>
          <el-table-column label="SPU描述" prop="description">
          </el-table-column>
          <el-table-column label="操作" width="360px">
            <template #default="{ row }">
              <el-button
                type="primary"
                icon="Plus"
                size="small"
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <!-- 查看SKU按钮 -->
              <el-button
                type="primary"
                icon="View"
                size="small"
                @click="viewSku(row.id)"
                title="查看SKU"
              ></el-button>

              <!-- 编辑SPU按钮 -->
              <el-button
                type="primary"
                icon="Edit"
                title="编辑SPU"
                size="small"
                @click="updateSpu(row)"
              ></el-button>
              <!-- pop气泡框 -->
              <el-popconfirm
                width="220"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="Delete"
                icon-color="#626AEF"
                @confirm="deleteSpu(row.id)"
              >
                <template #reference>
                  <el-button size="small" icon="Delete"> </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- sku数据列表展示对话框 -->
        <el-dialog v-model="showSkuFlag" title="sku列表">
          <el-table :data="showSku">
            <el-table-column prop="skuName" label="sku名称"> </el-table-column>
            <el-table-column prop="price" label="sku价格"> </el-table-column>
            <el-table-column prop="weight" label="sku重量"> </el-table-column>
            <el-table-column label="sku图片">
              <!-- <img src="skuDefaultImg" alt="" /> -->
              <template #default="{ row }">
                <img
                  :src="row.skuDefaultImg"
                  style="width: 100px; height: 100px"
                />
              </template>
            </el-table-column>
          </el-table>
          <el-button
            @click="closeSkuDialog"
            type="primary"
            style="margin: 10px auto 10px 90%"
            >关闭</el-button
          >
        </el-dialog>
        <div style="margin: 10px 0">
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="limit"
            :page-sizes="[3, 6, 9]"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <EditSpu
        ref="Editspu"
        v-show="scene == 1"
        @RegetSpu:any="regetspu"
        @chang2Scene0="toShowSpu"
      ></EditSpu>
      <!-- 场景2 添加sku页 -->
      <AddSku
        ref="addSkuComp"
        v-show="scene == 2"
        @chang2Scene0="toShowSpu"
      ></AddSku>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import EditSpu from "./EditSpu.vue";
import AddSku from "./AddSku.vue";
import { ref, onBeforeUnmount, watch } from "vue";
import useCategoryStore from "@/store/modules/category";
import { reqSpu, reqDeleteSpu, reqSkuList } from "@/api/product/spu/index";
import type {
  getSpuRes,
  recordsDataForm,
  skuData,
} from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
let categoryStore = useCategoryStore();
let scene = ref<number>(0);
let pageNo = ref(1);
let limit = ref(3);
let total = ref<number>(0);
let spuArr = ref<recordsDataForm[]>([]);
// 获取子组件实例
let Editspu = ref<any>();
let addSkuComp = ref<any>();
// 存储要展示的sku列表数据
let showSku = ref<skuData[]>([]);
let showSkuFlag = ref<number>(0);
//请求spu数据
const getSpu = async () => {
  let res: getSpuRes = await reqSpu(
    pageNo.value,
    limit.value,
    categoryStore.c3Id,
  );
  if (res.code == 200) {
    total.value = res.data.total;
    spuArr.value = res.data.records;
  } else {
    ElMessage({
      type: "error",
      message: "获取数据失败",
    });
  }
};
// 监听三级分类id变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 切换二级分类的时候，c3Id为"",此时应清空数据列表
    if (categoryStore.c3Id == "") {
      spuArr.value = [];
    }
    // 必须保证有c3Id,否则不发请求
    if (!categoryStore.c3Id) return;

    getSpu();
  },
);
// 每页数量变化
const handleSizeChange = () => {
  getSpu();
};
// 页数（pageNo）变化
const handleCurrentChange = () => {
  getSpu();
};
const AddSpuClick = () => {
  scene.value = 1;
  Editspu.value.initSpuRow();
};

// 更新spu
const updateSpu = (row: recordsDataForm) => {
  scene.value = 1;
  Editspu.value.getSpuTMlist(row);
};
const addSku = (row: recordsDataForm) => {
  scene.value = 2;
  addSkuComp.value.initAddSku(row);
};
const toShowSpu = (num: number) => {
  scene.value = num;
};
const regetspu = (command: string) => {
  if (command == "update") {
    getSpu();
  } else {
    pageNo.value = 1;
    getSpu();
  }
};

// 删除SPU
const deleteSpu = async (spuId: number) => {
  let res = await reqDeleteSpu(spuId);
  if (res.code == 200) {
    getSpu();
    ElMessage({
      type: "success",
      message: "删除成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
// 查看SKU
const viewSku = async (spuId: any) => {
  // 发请求获取sku数据
  let res = await reqSkuList(spuId);
  if (res.code == 200) {
    showSku.value = res.data;
    console.log(showSku);
  } else {
    ElMessage({
      type: "error",
      message: "获取sku列表数据失败",
    });
  }
  // 展示
  showSkuFlag.value = 1;
};
const closeSkuDialog = () => {
  showSkuFlag.value = 0;
};
// 挂载时，清空仓库
onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>

<style scoped></style>
