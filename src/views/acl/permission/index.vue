<template>
  <div>
    <el-card>
      <el-table border row-key="id" :data="permission">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="权限值" prop="code"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              :disabled="row.level > 3 ? true : false"
              @click="addPermission(row)"
              >{{ row.level > 2 ? "添加功能" : "添加菜单" }}</el-button
            >
            <el-button
              type="info"
              size="small"
              :disabled="row.level == 1 ? true : false"
              @click="editPermission(row)"
              >编辑</el-button
            >
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确认删除?"
              icon="Delete"
              icon-color="#626AEF"
              @confirm="confirmDelete(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  icon="Delete"
                  size="small"
                  :disabled="row.level == 1 ? true : false"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        v-model="adDialogFlag"
        title="添加菜单"
        style="width: 388px; height: 208px"
        @close="clearAddedP"
      >
        <el-form>
          <el-form-item label="名称">
            <el-input v-model="addedPermission.name"></el-input>
          </el-form-item>
          <el-form-item label="权限值">
            <el-input v-model="addedPermission.code"></el-input>
          </el-form-item>
          <el-form-item style="justify-content: flex-end">
            <el-button type="primary" @click="save">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  reqPermission,
  reqDeletePer,
  reqAddPermission,
  reqUpdatePermission,
} from "@/api/acl/permission/index";
import {
  permissionArr,
  permissionDataForm,
  resBase,
} from "@/api/acl/permission/type";
import { ElMessage } from "element-plus";
let permission = ref<permissionArr>([]);
let adDialogFlag = ref<boolean>(false);
let addedPermission = ref<permissionDataForm>({
  pid: "",
  name: "",
  code: "",
  level: "",
  id: "",
});
const getPermission = async () => {
  let res = await reqPermission();
  if (res.code == 200) {
    permission.value = res.data;
  }
};
// 添加或编辑菜单
const addPermission = (permission: permissionDataForm) => {
  adDialogFlag.value = true;
  addedPermission.value.pid = permission.id as number;
  addedPermission.value.level = (permission.level as number) + 1;
};
const editPermission = (permission: permissionDataForm) => {
  adDialogFlag.value = true;
  Object.assign(addedPermission.value, permission);
};
const save = async () => {
  let res = ref<resBase>();
  if (addedPermission.value.id) {
    res.value = await reqUpdatePermission(addedPermission.value);
  } else {
    res.value = await reqAddPermission(addedPermission.value);
  }
  if (res.value && res.value.code == 200) {
    ElMessage({
      type: "success",
      message: addedPermission.value.id ? "修改成功" : "添加菜单成功",
    });
    getPermission();
  } else {
    ElMessage({
      type: "error",
      message: addedPermission.value.id ? "修改失败" : "添加菜单失败",
    });
  }
  adDialogFlag.value = false;
  clearAddedP();
};
// 清空addedpermission
const clearAddedP = () => {
  Object.assign(addedPermission.value, {
    id: "",
    pid: "",
    name: "",
    code: "",
    level: "",
  });
};
// 确认删除菜单
const confirmDelete = async (id: number) => {
  let res = await reqDeletePer(id);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    // 重新获取数据
    getPermission();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
onMounted(() => {
  getPermission();
});
</script>

<style scoped lang="scss">
::v-deep .el-form-item__label {
  width: 58px;
  justify-content: flex-start;
}
::v-deep .el-form-item__content {
  justify-content: flex-end;
}
</style>
