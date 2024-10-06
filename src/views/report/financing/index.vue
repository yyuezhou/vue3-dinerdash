<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="财务报表"
      highlight-current-row
      :columns="columns"
      :request-api="getReportList"
      :row-class-name="tableRowClassName"
      :span-method="objectSpanMethod"
      :show-summary="true"
      :summary-method="getSummaries"
      @row-click="rowClick"
    >
      <!-- 表格 header 按钮 -->
      <!-- <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="proTable?.element?.toggleAllSelection">全选 / 全不选</el-button>
      </template> -->
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx" name="complexProTable">
import { reactive, ref } from "vue";
import { User } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { Delete, Refresh } from "@element-plus/icons-vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { deleteUser, resetUserPassWord } from "@/api/modules/user";
import Mock from "mockjs";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 表格配置项
const columns = reactive<ColumnProps<User.ResUserList>[]>([
  { type: "selection", width: 80 },
  { type: "index", label: "序号", width: 80 },
  { prop: "createTime", label: "日期", width: 200 },
  {
    prop: "detailsa",
    label: "实际收入",
    _children: [
      { prop: "one", label: "菜品" },
      { prop: "two", label: "酒水" },
      { prop: "three", label: "折扣" }
    ]
  },
  { prop: "get", label: "实际收入小计", width: 200 },
  {
    prop: "detailsb",
    label: "免单",
    _children: [
      { prop: "four", label: "菜品" },
      { prop: "five", label: "酒水" },
      { prop: "six", label: "折扣" }
    ]
  },
  { prop: "pay", label: "实际支付金额", width: 200 },
  {
    prop: "detailsc",
    label: "支付方式",
    _children: [
      { prop: "seven", label: "微信" },
      { prop: "eight", label: "支付宝" },
      { prop: "night", label: "银联" },
      { prop: "ten", label: "现金" },
      { prop: "ele", label: "账户余额" }
    ]
  },
  { prop: "fp", label: "是否开具发票", width: 200 },
  { prop: "username", label: "收银员", width: 200 },
  { prop: "remarks", label: "备注", width: 200 }
]);

// 表尾合计行（自行根据条件计算）
interface SummaryMethodProps<T = User.ResUserList> {
  columns: TableColumnCtx<T>[];
  data: T[];
}
const getSummaries = (param: SummaryMethodProps) => {
  const { columns } = param;
  const sums: string[] = [];
  columns.forEach((column, index) => {
    if (index === 0) return (sums[index] = "合计");
    else sums[index] = "8462.00";
  });
  return sums;
};

// 列合并
interface SpanMethodProps {
  row: User.ResUserList;
  column: TableColumnCtx<User.ResUserList>;
  rowIndex: number;
  columnIndex: number;
}
const objectSpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
  if (columnIndex === 3) {
    if (rowIndex % 2 === 0) return { rowspan: 2, colspan: 1 };
    else return { rowspan: 0, colspan: 0 };
  }
};

// 设置列样式
const tableRowClassName = ({ rowIndex }: { row: User.ResUserList; rowIndex: number }) => {
  if (rowIndex === 2) return "warning-row";
  if (rowIndex === 6) return "success-row";
  return "";
};

// 单击行
const rowClick = (row: User.ResUserList, column: TableColumnCtx<User.ResUserList>) => {
  if (column.property == "radio" || column.property == "operation") return;
  console.log(row);
};

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
  await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
  proTable.value?.getTableList();
};

// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
  await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
  proTable.value?.getTableList();
};
// function getData() {
//   axios.get("/test").then(res => {
//     console.log("res: ", res);
//   });
// }
/**
 * @desc 获取报表数据
 */
function getReportList() {
  return new Promise(resolve => {
    const data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      "list|99": [
        {
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          id: "@id",
          one: "@float",
          get: "@float",
          pay: "@float",
          two: "@float",
          three: "@float",
          four: "@float",
          five: "@float",
          six: "@float",
          seven: "@float",
          eight: "@float",
          night: "@float",
          ten: "@float",
          ele: "@float",
          createTime: "@datetime",
          username: "@cname",
          fp: "是",
          remarks: "@sentence"
        }
      ]
    });
    resolve({
      data: {
        list: data.list,
        pageNum: 1,
        pageSize: 10,
        total: 15
      }
    });
  });
}
</script>

<style lang="scss">
.el-table .warning-row,
.el-table .warning-row .el-table-fixed-column--right,
.el-table .warning-row .el-table-fixed-column--left {
  background-color: var(--el-color-warning-light-9);
}
.el-table .success-row,
.el-table .success-row .el-table-fixed-column--right,
.el-table .success-row .el-table-fixed-column--left {
  background-color: var(--el-color-success-light-9);
}
</style>
