<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-19 12:18:53
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 10:19:24
 * @FilePath: \vue3_admin_template\project\src\views\product\attr\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- 分类选择器 -->
    <Category :scene="scene" />
    <!-- 场景 -->
    <el-card style="margin: 10px 0">
      <!-- 表格页 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          style="margin-bottom: 10px"
          @click="addAttrClick"
        >
          添加属性
        </el-button>
        <el-table border :data="attrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <el-tag
                style="margin: 0 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ row }">
              <el-button
                type="primary"
                icon="Edit"
                size="small"
                @click="updateAttr(row)"
              ></el-button>
              <!-- pop气泡框 -->
              <el-popconfirm
                width="220"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="Delete"
                icon-color="#626AEF"
                :title="`确认删除${row.attrName}?`"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性页 -->
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名"
              v-model="addAttrParams.attrName"
              :ref="
                (vc: any) => {
                  addAttrFocus = vc;
                }
              "
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          size="default"
          :disabled="addAttrParams.attrName.trim() == '' ? true : false"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button type="defalut" size="default" @click="cancelAddAttr"
          >取消</el-button
        >
        <el-table
          border
          style="margin: 10px 0"
          :data="addAttrParams.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="180px"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #default="{ row, $index }">
              <!-- row即为该属性值的对象 -->
              <el-input
                v-if="row.flag == true"
                placeholder="输入属性值"
                v-model="row.valueName"
                @blur="toRead(row, $index)"
                :ref="
                  (vc: any) => {
                    inputArr[$index] = vc;
                  }
                "
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220px" align="center">
            <template #default="{ index }">
              <el-button
                type="primary"
                @click="addAttrParams.attrValueList.splice(index, 1)"
                icon="Delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="addAttrParams.attrValueList.length > 0 ? false : true"
          >保存</el-button
        >
        <el-button @click="cancelAddAttr">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from "vue";
import useCategoryStore from "@/store/modules/category";
// 请求属性列表
import { reqAttrList, reqEditAttr, reqDeleteAttr } from "@/api/product/attr";
// 属性列表类型
import type {
  AttrListForm,
  AttrListdataForm,
  attrValueListForm,
} from "@/api/product/attr/type";
import { ElMessage } from "element-plus";
let addAttrFocus = ref<any>({});
// 添加属性的卡片内容判断
let scene = ref(0);
// 收集新增属性数据信息
let addAttrParams = reactive<AttrListdataForm>({
  attrName: "", //新增的属性名
  attrValueList: [], //新增的属性的属性值数组
  categoryId: "", //新增的属性的所属分类的id
  categoryLevel: 3, //新增的属性所处分类的级别
});
// 获取input对象实例，实现表单自动聚焦
let inputArr = ref<any>([]);
// 点击添加属性的回调
const addAttrClick = () => {
  // 每次添加前清空上一次数据
  Object.assign(addAttrParams, {
    attrName: "", //新增的属性名
    attrValueList: [], //新增的属性的属性值数组
    categoryId: "", //新增的属性的所属分类的id
    categoryLevel: 3, //新增的属性所处分类的级别
  });
  scene.value = 1;
  addAttrParams.categoryId = categoryStore.c3Id;
  nextTick(() => {
    // 自动聚焦属性名称框
    addAttrFocus.value.focus();
  });
};
const cancelAddAttr = () => {
  scene.value = 0;
  getAttr();
};
let categoryStore = useCategoryStore();
// 存储属性列表数据
let attrArr = ref<AttrListdataForm[]>([]);
// 监听c3Id，改变就发请求要表格数据
const getAttr = async () => {
  let res: AttrListForm = await reqAttrList(
    categoryStore.c1Id,
    categoryStore.c2Id,
    categoryStore.c3Id,
  );
  attrArr.value = res.data;
};
watch(
  () => categoryStore.c3Id,
  () => {
    // 上一次查询的数据清空
    attrArr.value = [];
    // 如果c3id没有值，不要发请求
    if (!categoryStore.c3Id) return;
    //请求表格数据
    getAttr();
  },
);
// 添加属性值
const addAttrValue = () => {
  addAttrParams.attrValueList.push({
    valueName: "",
    flag: true,
  });
  nextTick(() => {
    inputArr.value[addAttrParams.attrValueList.length - 1].focus();
  });
};
// 保存添加的属性
const save = async () => {
  let res = await reqEditAttr(addAttrParams);
  if (res.code == 200) {
    scene.value = 0;
    getAttr();
    ElMessage({
      type: "success",
      message: addAttrParams.id ? "修改成功" : "添加成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: addAttrParams.id ? "修改失败" : "添加失败",
    });
  }
};
// 属性值编辑栏只读/编辑模式切换
const toRead = (row: attrValueListForm, $index: number) => {
  // 如果没有添加属性值就失去焦点，删除该属性值栏报错
  if (row.valueName.trim() == "") {
    addAttrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: "error",
      message: "属性值不能为空",
    });
  }
  // 如果数组中有相同的属性，应删除该属性值栏报错（检查时注意排除本身）
  let repeat = addAttrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName;
    }
  });
  if (repeat) {
    addAttrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: "error",
      message: "属性值不能相同",
    });
  }
  row.flag = false;
};
const toEdit = (row: attrValueListForm, $index: number) => {
  row.flag = true;
  nextTick(() => {
    inputArr.value[$index].focus();
  });
};
const updateAttr = (row: AttrListdataForm) => {
  // 深拷贝，防止修改页面的数据导致请求的数据一起被改掉
  Object.assign(addAttrParams, JSON.parse(JSON.stringify(row)));
  scene.value = 1;
};
const deleteAttr = async (id: number) => {
  let res = await reqDeleteAttr(id);
  if (res.code == 200) {
    getAttr();
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
onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>

<style scoped lang="scss"></style>
