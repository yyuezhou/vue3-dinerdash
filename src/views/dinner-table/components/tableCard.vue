<template>
  <div>
    <el-table :data="state.itemDetail.orderList">
      <el-table-column label="菜名" prop="name"></el-table-column>
      <el-table-column label="数量" prop="num"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup name="tableCard">
import { reactive, watch } from "vue";

const props = defineProps<{ tableId: string }>();
/**
 *  表格配置项
 * */
const state = reactive({
  itemDetail: {} as any
});

watch(
  () => props.tableId,
  id => {
    getData(id);
  },
  { immediate: true }
);
/**
 * @desc 获取餐桌详情
 */
function getData(id: string) {
  state.itemDetail = {
    name: "1号桌",
    id,
    total: "￥250",
    orderList: [
      { id: 1, name: "猪蹄炖萝卜", num: 1, price: "￥125" },
      { id: 2, name: "焖牛腩", num: 1, price: "￥175" },
      { id: 3, name: "紫菜汤", num: 1, price: "￥25" }
    ]
  };
}
</script>
