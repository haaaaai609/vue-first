<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-27 23:36:50
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 11:45:27
 * @FilePath: \vue3_admin_template\project\src\views\product\spu\EditSpu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-form label-width="98px">
      <el-form-item label="SPU名称">
        <el-input v-model="SpuRow.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="SpuRow.tmId" style="width: 188px">
          <el-option
            v-for="item in TMlistArr"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="SpuRow.description" type="textarea"></el-input>
      </el-form-item>
      <!-- 照片墙 -->
      <el-form-item label="SPU照片">
        <el-upload
          v-model:file-list="SpuImages"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
            w-full
            :src="showImgUrl"
            alt="Preview Image"
            style="width: 100%; height: 100%"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select
          :placeholder="
            unSelectAttArr.length > 0
              ? `还有${unSelectAttArr.length}个选择`
              : '无'
          "
          v-model="AddAttrIdAndName"
          :inline="true"
          style="width: 188px"
        >
          <el-option
            :value="`${item.id}:${item.name}`"
            v-for="item in unSelectAttArr"
            :key="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
        <!-- 追加属性 -->
        <el-button
          :disabled="AddAttrIdAndName ? false : true"
          type="primary"
          icon="Plus"
          style="margin-left: 18px"
          @click="AddAttr"
          >添加SPU销售属性</el-button
        >
        <!--展示属性表格 -->
        <el-table border style="margin: 18px 0" :data="SpuAttrArr">
          <el-table-column
            label="序号"
            align="center"
            width="80px"
            type="index"
          ></el-table-column>
          <el-table-column
            label="属性名"
            prop="saleAttrName"
            width="188px"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #default="{ row }">
              <!-- row即为点中那一行的对象 -->
              <el-tag
                style="margin: 0 5px"
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                >{{ item.saleAttrValueName }}</el-tag
              >
              <el-input
                v-if="row.flag == false"
                v-model="row.saleAttrValue"
                size="small"
                style="width: 100px"
                @blur="toRead(row)"
              ></el-input>
              <el-button
                v-else
                type="primary"
                icon="Plus"
                @click="AddTag(row)"
              ></el-button>
            </template>
          </el-table-column>
          <!-- 删除属性 -->
          <el-table-column label="操作" width="188px">
            <template #default="{ index }">
              <el-button
                type="primary"
                icon="Delete"
                @click="SpuAttrArr.splice(index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancelAddSpuAttr" style="margin-left: 18px"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from "vue";
import {
  reqGetTradeMarkList,
  reqSpuImage,
  reqSpuSaleAttr,
  reqAllSpuAttr,
  reqEditSpu,
} from "@/api/product/spu/index";
import type {
  TMlistData,
  getSpuAttrRes,
  spuAttrData,
  getSpuImageRes,
  ImagesData,
  getTMlistRes,
  recordsDataForm,
  AllSpuAttrRes,
  AllSpuAttrData,
} from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
import useCategoryStore from "@/store/modules/category";
let categoryStore = useCategoryStore();
let $emit = defineEmits(["chang2Scene0", "RegetSpu"]);

// 编辑某行的spu数据
let SpuRow = ref<recordsDataForm>({
  spuName: "",
  description: "",
  category3Id: "",
  tmId: "",
  spuSaleAttrList: [],
  spuImageList: [],
});
// 接收SPU品牌列表
let TMlistArr = ref<TMlistData[]>([]);
let SpuImages = ref<ImagesData[]>([]);
let SpuAttrArr = ref<spuAttrData[]>([]);
let AllSpuAttArr = ref<AllSpuAttrData[]>([]);
// 收集新增的属性id和名字
let AddAttrIdAndName = ref<any>("");
let dialogVisible = ref<boolean>(false);
let showImgUrl = ref<string>();
//获取某个SPU所有信息
const getSpuTMlist = async (spu: recordsDataForm) => {
  SpuRow.value = spu;
  let res: getTMlistRes = await reqGetTradeMarkList(categoryStore.c3Id);
  if (res.code == 200) {
    TMlistArr.value = res.data;
  } else {
    ElMessage({
      type: "error",
      message: "获取品牌数据失败",
    });
  }
  let res1: getSpuImageRes = await reqSpuImage(spu.id);
  if (res1.code == 200) {
    SpuImages.value = res1.data.map((item) => {
      return {
        name: item.imgName,
        url: item.imgUrl,
      };
    });
  } else {
    ElMessage({
      type: "error",
      message: "获取图片数据失败",
    });
  }
  let res2: getSpuAttrRes = await reqSpuSaleAttr(spu.id);
  if (res2.code == 200) {
    SpuAttrArr.value = res2.data;
  } else {
    ElMessage({
      type: "error",
      message: "获取属性数据失败",
    });
  }
  let res3: AllSpuAttrRes = await reqAllSpuAttr();
  if (res3.code == 200) {
    AllSpuAttArr.value = res3.data;
  } else {
    ElMessage({
      type: "error",
      message: "获取所有属性失败",
    });
  }
};
// 根据已有属性与全部属性计算未选择属性
let unSelectAttArr = computed(() => {
  let unSelectAtt = AllSpuAttArr.value.filter((item) => {
    return SpuAttrArr.value.every((item1) => {
      return item.name != item1.saleAttrName;
    });
  });
  return unSelectAtt;
});
// 添加属性
const AddAttr = () => {
  const [baseSaleAttrId, saleAttrName] = AddAttrIdAndName.value.split(":");
  let newSpuAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  };
  SpuAttrArr.value.push(newSpuAttr);
  AddAttrIdAndName.value = "";
  // SpuRow.value.id = undefined;
};
const AddTag = (row: spuAttrData) => {
  row.flag = false;
  // 防止saleAttrValue未定义
  row.saleAttrValue = "";
};
const toRead = (row: spuAttrData) => {
  row.flag = true;
  if (row.saleAttrValue?.trim() == "") {
    ElMessage({
      type: "error",
      message: "不可为空,添加失败",
    });
    return;
  }
  const { baseSaleAttrId, saleAttrValue } = row;
  let newAddAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  };
  // 判重
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == row.saleAttrValue;
  });
  if (repeat) {
    ElMessage({
      type: "error",
      message: "重复,添加失败",
    });
    return;
  }
  // 追加
  row.spuSaleAttrValueList.push(newAddAttrValue);
  ElMessage({
    type: "success",
    message: "添加成功",
  });
  // 清除
  row.saleAttrValue = "";
};
// 修改spu完成

// 以下是添加spu
// 点击添加spu，先初始化SpuRow
const initSpuRow = async () => {
  Object.assign(SpuRow.value, {
    id: "",
    spuName: "",
    description: "",
    category3Id: "",
    tmId: "",
    spuSaleAttrList: [],
    spuImageList: [],
  });
  // 拿到全部品牌数据和所有spu销售属性
  let res = await reqGetTradeMarkList(categoryStore.c3Id);
  let res1 = await reqAllSpuAttr();
  TMlistArr.value = res.data;
  AllSpuAttArr.value = res1.data;
  SpuImages.value = [];
  AddAttrIdAndName.value = "";
  SpuAttrArr.value = [];
  SpuRow.value.category3Id = categoryStore.c3Id;
};
const save = async () => {
  // 整理数据
  SpuRow.value.spuImageList = SpuImages.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    };
  });
  SpuRow.value.spuSaleAttrList = SpuAttrArr.value;
  // 发送请求
  let res = await reqEditSpu(SpuRow.value);
  console.log(SpuRow.value);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: SpuRow.value.id ? "修改成功" : "添加成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: SpuRow.value.id ? "修改失败" : "添加失败",
    });
  }
  // 退回并重新获取数据
  $emit("chang2Scene0", 0);
  $emit("RegetSpu", SpuRow.value.id ? "update" : "add");
};
// 照片墙展示(可拓展：照片墙可翻页)
const handlePictureCardPreview = (file: any) => {
  // console.log(file);
  showImgUrl.value = file.url;
  dialogVisible.value = true;
};
const cancelAddSpuAttr = () => {
  $emit("chang2Scene0", 0);
};
// 对外暴露，父组件使用
defineExpose({ getSpuTMlist, initSpuRow });
</script>

<style scoped></style>
