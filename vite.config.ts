/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-11 17:27:21
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-21 18:06:13
 * @FilePath: \vue3_admin_template\project\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig, loadEnv } from "vite";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
//mock
// import { UserConfigExport, ConfigEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";

import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 执行loadEnv会返回当前环境对象
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === "serve",
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/variable.scss";',
        },
      },
    },
    // 代理宽域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址
          target: env.VITE_SERVE,
          // 需要跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
