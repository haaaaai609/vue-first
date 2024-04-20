import { defineStore } from "pinia";
import { reqCategory1, reqCategory2, reqCategory3 } from "@/api/product/attr";
import { ElMessage } from "element-plus";
import type { categoryResdata } from "@/api/product/attr/type";
import type { categoryState } from "./type/type";
const useCategoryStore = defineStore("CategoryStore", {
  state: (): categoryState => {
    return {
      c1Arr: [],
      c1Id: "",
      c2Arr: [],
      c2Id: "",
      c3Arr: [],
      c3Id: "",
    };
  },
  actions: {
    async getC1() {
      const res: categoryResdata = await reqCategory1();
      if (res.code == 200) {
        this.c1Arr = res.data;
      } else {
        ElMessage({
          type: "error",
          message: "获取一级分类数据失败",
        });
      }
    },
    async getC2() {
      const res: categoryResdata = await reqCategory2(this.c1Id);
      if (res.code == 200) {
        this.c2Arr = res.data;
      } else {
        ElMessage({
          type: "error",
          message: "获取二级分类数据失败",
        });
      }
    },
    async getC3() {
      const res: categoryResdata = await reqCategory3(this.c2Id);
      if (res.code == 200) {
        this.c3Arr = res.data;
      } else {
        ElMessage({
          type: "error",
          message: "获取三级分类数据失败",
        });
      }
    },
  },
  getters: {},
});
export default useCategoryStore;
