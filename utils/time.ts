/*
 * @Author: Haaaaai 1306625287@qq.com
 * @Date: 2024-03-18 11:28:32
 * @LastEditors: Haaaaai 1306625287@qq.com
 * @LastEditTime: 2024-03-18 11:29:59
 * @FilePath: \vue3_admin_template\project\utils\time.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//时间函数

export const getTime = () => {
  const hour = new Date().getHours();
  let TimeJudge = "";
  if (hour > 6 && hour <= 11) {
    TimeJudge = "早上";
  } else if (hour > 11 && hour <= 13) {
    TimeJudge = "中午";
  } else if (hour > 13 && hour <= 18) {
    TimeJudge = "下午";
  } else if (hour > 18 && hour <= 24) {
    TimeJudge = "晚上";
  } else {
    TimeJudge = "凌晨";
  }
  return TimeJudge;
};
