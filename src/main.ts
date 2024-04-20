/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-11 17:27:21
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-19 01:41:50
 * @FilePath: \vue3_admin_template\project\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import "element-plus/theme-chalk/dark/css-vars.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
//svg配置代码/
import "virtual:svg-icons-register";
import globalComponent from "./components/index";
//scss全局变量配置
import "@/style/index.scss";
// import axios from "axios";
//引入路由
import router from "./router";
// 路由鉴权
import "./permission";
//引入仓库
import pinia from "@/store";
// 自定义指令
import { hasButton } from "./directive/has";
const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(globalComponent);
app.use(pinia);
app.use(router);

hasButton(app);
app.mount("#app");
