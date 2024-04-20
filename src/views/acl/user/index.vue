<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-19 12:05:46
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 10:16:42
 * @FilePath: \vue3_admin_template\project\src\views\acl\user\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-card style="margin: 10px 0">
      <el-form :inline="true">
        <el-form-item label="用户名" style="margin: auto 10px">
          <el-input placeholder="请输入用户名字" v-model="keyword"></el-input>
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
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-popconfirm
        width="220"
        confirm-button-text="确定"
        cancel-button-text="取消"
        title="确认删除?"
        icon="Delete"
        icon-color="#626AEF"
        @confirm="batchesDeleteUsers"
      >
        <template #reference>
          <el-button
            type="danger"
            :disabled="deleteUserIdList.length > 1 ? false : true"
            >批量删除</el-button
          >
        </template>
      </el-popconfirm>

      <el-drawer v-model="addUserFlag">
        <template #header>
          <h4>{{ addUserInfo.id ? "修改" : "添加" }}用户</h4>
        </template>
        <!-- 验证三大要素：model(填入的数据)，rules，item上的prop -->
        <el-form :model="addUserInfo" :rules="editUserInfoRules" ref="formRef">
          <el-form-item label="用户名字" prop="name"
            ><el-input v-model="addUserInfo.name"></el-input
          ></el-form-item>
          <el-form-item label="用户昵称" prop="username"
            ><el-input v-model="addUserInfo.username"></el-input
          ></el-form-item>
          <el-form-item label="登陆密码" prop="password"
            ><el-input v-model="addUserInfo.password"></el-input
          ></el-form-item>
          <el-form-item
            class="confirmAndcancel"
            style="justify-content: flex-end"
          >
            <el-button type="primary" @click="confirmAddUser(addUserInfo)"
              >确定</el-button
            >
            <el-button @click="addUserFlag = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <el-table
        border
        :data="userList"
        style="margin: 10px 0"
        @selection-change="selectTigger"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="id" label="id" width="80"></el-table-column>
        <el-table-column
          prop="name"
          label="用户名字"
          width="128"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="用户昵称"
          width="128"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
          width="128"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="128"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="128"
        ></el-table-column>
        <el-table-column label="操作" width="268">
          <template #default="{ row, index }">
            <el-button
              size="small"
              type="primary"
              icon="User"
              @click="distributeRole(row)"
              >分配职位</el-button
            >
            <el-button
              size="small"
              type="primary"
              icon="Edit"
              @click="editUser(row)"
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
              @confirm="deleteUser(row.id, index)"
            >
              <template #reference>
                <el-button size="small" icon="Delete"> </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分配角色页 -->
      <el-drawer v-model="distribueRoleFlag">
        <template #header> <h4>分配职位</h4> </template>
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="distributedRole.name" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <el-checkbox-group
              v-model="checkedRoles"
              @change="handleCheckedRolesChange"
            >
              <el-checkbox
                v-for="item in allRoles"
                :key="item.id"
                :label="item"
                >{{ item.roleName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="confirmDistributeRoles">保存</el-button>
          <el-button @click="distribueRoleFlag = false">取消</el-button>
        </template>
      </el-drawer>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="limitNo"
        :page-sizes="[6, 10, 16]"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import {
  reqUserList,
  reqDeleteUser,
  reqAddUser,
  reqUpdateUser,
  reqUserRoles,
  reqDistributeRoles,
  reqBatchesDeleteUsers,
} from "@/api/acl/user/index.ts";
import {
  recordsDataForm,
  rolesDataForm,
  distributeRolesLoadForm,
} from "@/api/acl/user/type";
import { ElMessage } from "element-plus";
// 分页器
let currentPage = ref<number>(1);
let limitNo = ref<number>(6);
let total = ref<number>(20);
// 接收用户列表
let userList = ref<recordsDataForm[]>([]);
// 控制添加用户页弹出
let addUserFlag = ref<boolean>(false);
// 控制分配角色页弹出
let distribueRoleFlag = ref<boolean>(false);
// 添加的新用户信息
let addUserInfo = ref<recordsDataForm>({
  name: "",
  username: "",
  password: "",
});
let formRef = ref();
// 想分配角色的用户名
let distributedRole = ref<recordsDataForm>({
  username: "",
  password: "",
  name: "",
});
// 接收获取到的职位信息
// 所有职位
let allRoles = ref<rolesDataForm[]>([]);
// 已有职位
let checkedRoles = ref<rolesDataForm[]>([]);
// 分配角色负载
let distributeRoleLoad = ref<distributeRolesLoadForm>({
  roleIdList: [],
  userId: "",
});
// 删除的用户id列表
let deleteUserIdList = ref<number[]>([]);
// 搜索栏关键字
let keyword = ref<string>("");
const getUserList = async (page: number, limit: number) => {
  let res = await reqUserList(page, limit, keyword.value);
  if (res.code == 200) {
    currentPage.value = res.data.current;
    limitNo.value = res.data.size;
    total.value = res.data.total;
    userList.value = res.data.records;
  } else {
    ElMessage({
      type: "error",
      message: "获取数据失败",
    });
  }
};
// 改变页数重新发请求被
const handleCurrentChange = (num: number) => {
  getUserList(num, limitNo.value);
};
// 改变一页展示数量重新发请求
const handleSizeChange = (limitNo: number) => {
  getUserList(currentPage.value, limitNo);
};
// 删除user
const deleteUser = async (userid: any, index: any) => {
  let res = await reqDeleteUser(userid);
  if (res.code == 200) {
    userList.value.splice(index, 1);
    ElMessage({
      type: "success",
      message: "删除用户成功",
    });
    getUserList(currentPage.value, limitNo.value);
  } else {
    ElMessage({
      type: "error",
      message: "删除用户失败",
    });
  }
};
// 添加用户
const addUser = () => {
  // 清空上一次内容
  addUserInfo.value = {
    name: "",
    username: "",
    password: "",
  };
  // 重置字段并清空表单校验
  nextTick(() => {
    formRef.value.clearValidate();
  });
  // 弹出添加页
  addUserFlag.value = true;
};
// 确认添加
const confirmAddUser = async (userInfo: recordsDataForm) => {
  // 表单校验务必通过再发请求
  await formRef.value.validate();
  if (userInfo.id) {
    let res = await reqUpdateUser(userInfo);
    if (res.code == 200) {
      addUserFlag.value = false;
      ElMessage({
        type: "success",
        message: "修改用户成功",
      });
      // 每次更新完毕，刷新页面，把自己修改就会登出
      window.location.reload();
    } else {
      ElMessage({
        type: "error",
        message: "修改用户失败",
      });
    }
  } else {
    let res = await reqAddUser(userInfo);
    if (res.code == 200) {
      addUserFlag.value = false;
      ElMessage({
        type: "success",
        message: "添加用户成功",
      });
    } else {
      ElMessage({
        type: "error",
        message: "添加用户失败",
      });
    }
  }
  getUserList(1, limitNo.value);
};
// 修改用户信息
const editUser = async (user: recordsDataForm) => {
  addUserFlag.value = true;
  // 重置字段并清空表单校验
  nextTick(() => {
    formRef.value.clearValidate();
  });
  Object.assign(addUserInfo.value, user);
};

// 编辑用户信息时的表单验证
const editUserInfoRules = {
  name: [
    { required: true, message: "请输入用户名字", trigger: "blur" },
    {
      pattern: /^\S{2,8}$/,
      message: "名称长度为2~8个字符",
      trigger: "blur",
    },
  ],
  username: [
    { required: true, message: "请输入用户昵称", trigger: "blur" },
    {
      pattern: /^\S{5,10}$/,
      message: "密码由5-10个数字或字母组成",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入用户密码", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9]{8,15}$/,
      message: "密码由8-15个数字或字母组成",
      trigger: "blur",
    },
  ],
};
// 分配角色
const distributeRole = async (userInfo: recordsDataForm) => {
  // 展示页面
  distribueRoleFlag.value = true;
  // 拿到用户名
  Object.assign(distributedRole.value, userInfo);
  // 请求职位信息
  let res = await reqUserRoles(userInfo.id as number);
  if (res.code == 200) {
    allRoles.value = res.data.allRolesList;
    checkedRoles.value = res.data.assignRoles;
    handleCheckedRolesChange(checkedRoles.value);
    getUserList(currentPage.value, limitNo.value);
  } else {
    ElMessage({
      type: "error",
      message: "获取职位信息失败",
    });
  }
};
// 确认分配角色
const confirmDistributeRoles = async () => {
  distributeRoleLoad.value.userId = distributedRole.value.id as number;
  distributeRoleLoad.value.roleIdList = checkedRoles.value.map(
    (item) => item.id,
  );
  // 发送请求
  let res = await reqDistributeRoles(distributeRoleLoad.value);
  if (res.code == 200) {
    // 关闭分配页
    distribueRoleFlag.value = false;
    ElMessage({
      type: "success",
      message: "保存成功",
    });
  } else {
    ElMessage({
      type: "success",
      message: "保存失败",
    });
  }
};
// 批量删除
// 获取选中user的id
const selectTigger = (value: recordsDataForm[]) => {
  // 保存value
  deleteUserIdList.value = value.map((item) => item.id as number);
};
// 确认批量删除
const batchesDeleteUsers = async () => {
  // 发请求删除
  let res = await reqBatchesDeleteUsers(deleteUserIdList.value);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "批量删除成功",
    });
    getUserList(currentPage.value, limitNo.value);
  } else {
    ElMessage({
      type: "error",
      message: "批量删除失败",
    });
  }
};
// 搜索
const searchKey = () => {
  if (keyword.value) {
    getUserList(currentPage.value, limitNo.value);
  } else {
    ElMessage({
      type: "error",
      message: "搜索内容不能为空",
    });
  }
};
// 重置,刷新main
const reset = () => {
  keyword.value = "";
  getUserList(1, limitNo.value);
};
// 挂载就请求数据
onMounted(() => {
  getUserList(currentPage.value, limitNo.value);
});
// 复选框代码
let checkAll = ref<boolean>(false);
const isIndeterminate = ref<boolean>(false);
const handleCheckAllChange = (val: boolean) => {
  checkedRoles.value = val ? allRoles.value : [];
  isIndeterminate.value = false;
};
const handleCheckedRolesChange = (value: rolesDataForm[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === allRoles.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoles.value.length;
};
</script>

<style scoped lang="scss">
.confirmAndcancel {
  ::v-deep .el-form-item__content {
    flex: unset;
  }
}
</style>
