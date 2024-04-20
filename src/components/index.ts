/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-13 22:05:03
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-19 11:20:58
 * @FilePath: \vue3_admin_template\project\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import SvgIcon from "./SvgIcon/Index.vue";
import Category from "./category/index.vue";
import type { App, Component } from "vue";
// 引入所有图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const components: { [name: string]: Component } = { SvgIcon, Category };
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
    //element提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
