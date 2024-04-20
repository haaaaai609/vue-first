<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-19 12:19:55
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 12:46:56
 * @FilePath: \vue3_admin_template\project\src\views\product\trademark\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-card class="card-box">
      <el-button
        type="primary"
        icon="Plus"
        @click="addTrademark"
        v-has="`btn.Trademark.add`"
        >添加</el-button
      >
      <el-table style="margin: 10px 0px" border :data="trademarkArr">
        <el-table-column label="序号" type="index" width="80" align="center" />
        <!-- table默认展示数据用div，可以用插槽自己改 -->
        <el-table-column label="品牌名称" align="center">
          <template #default="{ row }">
            <pre>{{ row.tmName }}</pre>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="品牌LOGO" align="center">
          <template #default="{ row }">
            <img
              :src="row.logoUrl"
              alt="暂无图片"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="品牌操作" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              icon="Edit"
              @click="editTrademark(row)"
            ></el-button>
            <!-- pop气泡框 -->
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="Delete"
              icon-color="#626AEF"
              :title="`确认删除${row.tmName}?`"
              @confirm="deleteTrademark(row.id)"
            >
              <template #reference>
                <el-button>Delete</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 9]"
          layout="prev, pager, next, jumper,->,total, sizes,"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="getHasTrademark"
        />
      </div>
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      v-model="isShow"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
      style="width: 560px"
      :show-close="false"
      @close="handleClose"
    >
      <!-- 表单 -->
      <el-form
        :model="trademarkParams"
        :rules="rules"
        style="width: 80%"
        label-width="100px"
        ref="formRef"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            type="text"
            style="width: 100%"
            v-model="trademarkParams.tmName"
          />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            v-model="trademarkParams.tmName"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <template #footer>
        <el-button type="primary" @click="dialogCancel">取消</el-button>
        <el-button type="primary" @click="dialogCertain">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, type UploadProps } from "element-plus";
import { ref, onMounted, reactive } from "vue";
import {
  reqHasTrademark,
  reqEditTrademark,
  reqDelete,
} from "@/api/product/trademark";
import { trademarkResData, recordsForm } from "@/api/product/trademark/type";
let pageNo = ref<number>(1);
let limit = ref<number>(3);
// 数据总数
let total = ref<number>(0);
let formRef = ref();
// 新定义收集新增的品牌数据
let trademarkParams = reactive<recordsForm>({
  tmName: "",
  logoUrl: "",
});
// 从服务器拿的已有品牌数据数组
let trademarkArr = ref<recordsForm[]>([]);
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager;
  let res: trademarkResData = await reqHasTrademark(pageNo.value, limit.value);
  if (res.code == 200) {
    total.value = res.data.total;
    trademarkArr.value = res.data.records;
    return true;
  } else {
    ElMessage({
      type: "error",
      message: "请求数据失败",
    });
    return false;
  }
};
onMounted(() => {
  getHasTrademark();
});
// 删除一个品牌
const deleteTrademark = async (id: number | undefined) => {
  let res = await reqDelete(id);
  if (res.code == 200) {
    getHasTrademark(pageNo.value);
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
// const handleCurrentChange = () => {
//   // 对于自定义事件，分页组件回传了数据（当前页码）
//   getHasTrademark();
// };
const handleSizeChange = () => {
  getHasTrademark();
};
// 对话框是否显示
const isShow = ref<boolean>(false);
const addTrademark = () => {
  isShow.value = true;
};
// 新增|修改品牌
const editTrademark = (row: recordsForm) => {
  Object.assign(trademarkParams, row);
  isShow.value = true;
};
// 对话框关闭回调
const handleClose = () => {
  formRef.value.clearValidate();
};
// 对话框表单校验

const validatortmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length > 1) {
    callback();
  } else {
    callback(new Error("品牌名称长度需大于2位"));
  }
};

const validatorLogo = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error("请上传图片"));
  }
};
const rules = reactive({
  tmName: [
    {
      required: true,
      validator: validatortmName,
      trigger: "blur",
    },
  ],
  logoUrl: [{ required: true, validator: validatorLogo }],
});

// 对话框按钮
const dialogCancel = () => {
  isShow.value = false;
  trademarkParams.id = 0;
  trademarkParams.logoUrl = "";
  trademarkParams.tmName = "";
};
const dialogCertain = async () => {
  // 提交之前，验证表单
  await formRef.value.validate();

  isShow.value = false;
  let res: any = await reqEditTrademark(trademarkParams);
  if (res.code == 200) {
    if (!trademarkParams.id && trademarkArr.value.length == 3) {
      getHasTrademark(pageNo.value + 1);
    } else {
      getHasTrademark(pageNo.value);
    }
    ElMessage({
      type: "success",
      message: trademarkParams.id ? "修改品牌成功" : "添加品牌成功",
    });
    trademarkParams.id = 0;
  } else {
    ElMessage({
      type: "error",
      message: trademarkParams.id ? "修改品牌失败" : "添加品牌失败",
    });
    trademarkParams.id = 0;
  }
  trademarkParams.logoUrl = "";
  trademarkParams.tmName = "";
};

// 图片上传前
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type == "image/png" ||
    rawFile.type == "image/jpeg" ||
    rawFile.type == "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 <= 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "图片大小超过4M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "图片格式应为png/jpg/gif",
    });
    return false;
  }
};
// 上传成功后

const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  // 返回的response里的data就是服务器中图片的地址
  trademarkParams.logoUrl = response.data;
  // 清理掉检验字段
  formRef.value.clearValidate("logoUrl");
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
