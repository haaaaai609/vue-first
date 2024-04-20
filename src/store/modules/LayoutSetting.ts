/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-20 11:38:45
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-04-16 15:53:38
 * @FilePath: \vue3_admin_template\project\src\store\modules\LayoutSetting.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";

const useLayoutSettingStore = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false,
      refresh: false,
    };
  },
});

export default useLayoutSettingStore;
