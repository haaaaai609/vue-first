/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-12 16:35:34
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-20 21:11:58
 * @FilePath: \vue3_admin_template\project\scritps\preinstall.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
if (!/pnpm/.test(process.env.npm_execpath || "")) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
    ` for scripts to work properly.\u001b[39m\n`,
  );
  process.exit(1);
}
