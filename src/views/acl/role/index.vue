<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-19 12:06:51
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 10:14:58
 * @FilePath: \vue3_admin_template\project\src\views\acl\role\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-card style="margin: 10px 0">
      <el-form :inline="true">
        <el-form-item label="职位名称" style="margin: auto 10px">
          <el-input placeholder="请输入职位名称" v-model="keyword"></el-input>
        </el-form-item>
        <el-button
          type="primary"
          :disabled="keyword ? false : true"
          @click="searchKey"
          >搜索</el-button
        >
        <el-button @click="reset">重置</el-button>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="addRole">添加职位</el-button>
      <el-popconfirm
        width="220"
        confirm-button-text="确定"
        cancel-button-text="取消"
        title="确认删除?"
        icon="Delete"
        icon-color="#626AEF"
        @confirm="batchesDeleteRoles"
      >
        <template #reference>
          <el-button
            type="danger"
            :disabled="batchesDelIdList.length > 1 ? false : true"
            >批量删除</el-button
          >
        </template>
      </el-popconfirm>
      <!-- 添加职位页 -->
      <el-drawer v-model="addRoleFlag">
        <template #header>
          <h4>添加新职位</h4>
        </template>
        <!-- 验证三大要素：model(填入的数据)，rules，item上的prop -->
        <el-form
          :model="ADDorEDITRoleInfo"
          :rules="editRoleInfoRules"
          ref="formRef"
        >
          <el-form-item label="职位名称" prop="roleName"
            ><el-input v-model="ADDorEDITRoleInfo.roleName"></el-input
          ></el-form-item>
          <el-form-item
            class="confirmAndcancel"
            style="justify-content: flex-end"
          >
            <el-button
              type="primary"
              @click="confirmAddorEditRole(ADDorEDITRoleInfo)"
              >确定</el-button
            >
            <el-button @click="addRoleFlag = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <!-- 数据展示 -->
      <el-table
        border
        :data="rolesList"
        style="margin: 10px 0"
        @selection-change="selectTigger"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="id" label="id" width="80"></el-table-column>
        <el-table-column
          prop="roleName"
          label="职位名称"
          width="188"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="188"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="188"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              size="small"
              type="primary"
              icon="User"
              @click="distributeRole(row)"
              >分配权限</el-button
            >
            <el-button
              size="small"
              type="primary"
              icon="Edit"
              @click="editRole(row)"
              >编辑</el-button
            >
            <!-- pop气泡框 -->
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              title="确认删除?"
              icon="Delete"
              icon-color="#626AEF"
              @confirm="deleteRole(row.id)"
            >
              <template #reference>
                <el-button size="small" icon="Delete"> </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分配权限页 -->
      <el-drawer v-model="distributeRoleFlag">
        <template #header> <h4>分配权限</h4> </template>
        <el-form>
          <el-form-item label="职位">
            <el-input v-model="distributedRole.roleName" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="职位权限">
            <el-tree
              ref="treeComp"
              style="max-width: 600px"
              :data="roleJurList"
              :show-checkbox="true"
              node-key="id"
              :default-checked-keys="selectIdList"
              default-expand-all
              :props="defaultProps"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button type="primary" @click="saveJur">保存</el-button>
          <el-button @click="distributeRoleFlag = false">取消</el-button>
        </template>
      </el-drawer>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limitSize"
        :page-sizes="[3, 6, 10, 16]"
        layout="prev, pager, next, jumper,->,sizes,,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import {
  reqRolesList,
  reqAddRole,
  reqEditRole,
  reqDeleteRole,
  reqBatchesDelRoles,
  reqRoleJurisdiction,
  reqSetJur,
} from "@/api/acl/role/index";
import { RoleDataForm, jurList } from "@/api/acl/role/type";
import useLayoutSettingStore from "@/store/modules/LayoutSetting";
import { ElMessage } from "element-plus";
let LayoutSettingStore = useLayoutSettingStore();
// 分页器相关
let pageNo = ref<number>(1);
let limitSize = ref<number>(6);
let total = ref<number>(0);
// 接收角色列表数据
let rolesList = ref<RoleDataForm[]>([]);
// 控制添加角色页弹出
let addRoleFlag = ref<boolean>(false);
// 添加的职位的信息
let ADDorEDITRoleInfo = ref<RoleDataForm>({
  roleName: "",
  id: "",
});
// 表单实例
let formRef = ref();
// 批量删除的职位列表
let batchesDelIdList = ref<number[]>([]);
// 搜索职位名
let keyword = ref<string>("");
// 分配权限页弹出
let distributeRoleFlag = ref<boolean>(false);
// 被分配权限的职位
let distributedRole = ref<RoleDataForm>({
  roleName: "",
  id: "",
});
// 接收职位权限列表
let roleJurList = ref<jurList>([]);
// 筛选出的id数组
let selectIdList = ref<number[]>([]);
//树形组件实例
let treeComp = ref();
// 获取角色数据列表
const getRolesList = async (roleName = "") => {
  let res = await reqRolesList(pageNo.value, limitSize.value, roleName);
  if (res.code == 200) {
    rolesList.value = res.data.records;
    pageNo.value = res.data.current;
    limitSize.value = res.data.size;
    total.value = res.data.total;
  } else {
    ElMessage({
      type: "error",
      message: "获取职位列表失败",
    });
  }
};
// 添加职位
const addRole = () => {
  Object.assign(ADDorEDITRoleInfo.value, {
    roleName: "",
    id: "",
  });
  // 清除上一次表单校验
  nextTick(() => {
    formRef.value.clearValidate();
  });

  addRoleFlag.value = true;
};
const confirmAddorEditRole = async (addoreditRole: RoleDataForm) => {
  if (!addoreditRole.id) {
    let res = await reqAddRole(addoreditRole);
    if (res.code == 200) {
      addRoleFlag.value = false;
      ElMessage({
        type: "success",
        message: "添加职位成功",
      });
      pageNo.value = 1;
      getRolesList();
    } else {
      ElMessage({
        type: "error",
        message: "添加职位失败",
      });
    }
  } else {
    let res = await reqEditRole(addoreditRole);
    if (res.code == 200) {
      addRoleFlag.value = false;
      ElMessage({
        type: "success",
        message: "修改职位成功",
      });
      getRolesList();
    } else {
      ElMessage({
        type: "error",
        message: "修改职位失败",
      });
    }
  }
};
// 添加的角色信息校验规则
const editRoleInfoRules = {
  roleName: [
    { required: "true", message: "职位名称不能为空", trigger: "blur" },
  ],
};
// 编辑职位
const editRole = (role: RoleDataForm) => {
  Object.assign(ADDorEDITRoleInfo.value, role);
  // 清除上一次表单校验
  nextTick(() => {
    formRef.value.clearValidate();
  });
  addRoleFlag.value = true;
};
// 删除职位
const deleteRole = async (roleId: number) => {
  let res = await reqDeleteRole(roleId);
  if (res.code == 200) {
    getRolesList();
    ElMessage({
      type: "success",
      message: "删除职位成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "删除职位失败",
    });
  }
};
// 批量删除职位
const selectTigger = (value: RoleDataForm[]) => {
  batchesDelIdList.value = value.map((item) => item.id as number);
};
const batchesDeleteRoles = async () => {
  let res = await reqBatchesDelRoles(batchesDelIdList.value);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "批量删除成功",
    });
    getRolesList();
  }
};
// 搜索框
const searchKey = () => {
  getRolesList(keyword.value);
};
const reset = () => {
  LayoutSettingStore.refresh = !LayoutSettingStore.refresh;
};
// 分配权限页
const distributeRole = async (role: RoleDataForm) => {
  distributedRole.value = role;
  distributeRoleFlag.value = true;
  let res = await reqRoleJurisdiction(role.id as number);
  if (res.code == 200) {
    roleJurList.value = res.data;
    selectIdList.value = filterSelectArr(roleJurList.value, []);
  } else {
    ElMessage({
      type: "error",
      message: "获取权限失败",
    });
  }
};
// 保存权限
const saveJur = async () => {
  // 收集选中的权限的id列表
  let arr = treeComp.value.getCheckedKeys();
  // 半选也得发
  let arr1 = treeComp.value.getHalfCheckedKeys();
  let permissionIdList = arr.concat(arr1);
  console.log(permissionIdList);
  // 发请求
  let res = await reqSetJur(
    distributedRole.value.id as number,
    permissionIdList,
  );
  if (res.code == 200) {
    distributeRoleFlag.value = false;
    ElMessage({
      type: "success",
      message: "分配权限成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "分配权限失败",
    });
  }
};
// 筛选权限
const filterSelectArr = (allData: jurList, initArr: number[]) => {
  allData.forEach((item) => {
    // 如果有子数组且长度>0,继续递归
    if ((item.children as jurList).length > 0) {
      filterSelectArr(item.children as jurList, initArr);
      // 筛出子数组为空且select属性为true的项
    } else if (item.select) {
      initArr.push(item.id);
    }
  });
  return initArr;
};
const defaultProps = {
  children: "children",
  label: "name",
};
// 分页器相关
const handleCurrentChange = () => {
  getRolesList();
};
const handleSizeChange = (num: number) => {
  limitSize.value = num;
  pageNo.value = 1;
  getRolesList();
};
// 挂载就获取第一页数据
onMounted(() => {
  getRolesList();
});
</script>

<style scoped></style>
