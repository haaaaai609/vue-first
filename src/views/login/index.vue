<!--
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-15 12:19:51
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 10:18:02
 * @FilePath: \vue3_admin_template\project\src\views\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 主页面 -->
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 表单 -->
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password"
            >
            </el-input>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button
              class="form_btn"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// import { useRoute } from "vue-router";
import { User, Lock } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
//引入封装的时间判断函数
import { getTime } from "../../../utils/time";
//获取路由器
//引入小仓库
import useUserStore from "@/store/modules/user";
let useStore = useUserStore();
let $router = useRouter();
// let $route = useRoute();
//用户1信息
let loginForm = reactive({ username: "admin", password: "111111" });
//加载效果
let loading = ref(false);
//校验规则
let loginFormRef = ref();
const checkUsername = (rule: any, value: any, callback: any) => {
  if (value.length >= 5 && value.length <= 15) {
    callback();
  } else {
    callback(new Error("账号长度5-15位"));
  }
};
const checkPwd = (rule: any, value: any, callback: any) => {
  if (value.length >= 6 && value.length <= 15) {
    callback();
  } else {
    callback(new Error("密码长度6-15位"));
  }
};
const rules = {
  username: [
    {
      trigger: "change",
      validator: checkUsername,
    },
  ],
  password: [
    {
      trigger: "change",
      validator: checkPwd,
    },
  ],
};
//登录按钮点击
const login = async () => {
  await loginFormRef.value.validate();
  loading.value = true;
  try {
    loading.value = false;
    //保证登陆成功
    await useStore.userLogin(loginForm);
    // let redirect: any = $route.query.redirect;
    // $router.push({ path: redirect || "/" });
    //编程式导航跳转到首页
    $router.push("/");
    ElNotification({
      type: "success",
      message: "欢迎回来吴彦祖",
      title: `HI,${getTime()}好`,
    });
  } catch (error) {
    loading.value = false;
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
}
.login-form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url("@/assets/images/login_form.png") no-repeat;
  background-size: cover;
  padding: 40px;
}
h1 {
  color: white;
  font-size: 40px;
}
h2 {
  color: white;
  font-size: 32px;
}
.form_btn {
  width: 100%;
}
</style>
