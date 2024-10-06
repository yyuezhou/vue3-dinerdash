<template>
  <div class="home-page">
    <div class="top">
      <div class="list">
        <div
          v-for="(item, idx) in state.list"
          :key="idx"
          :class="['table-item', getStatusSyle(item.status), { curTable: state.curtable === item.id }]"
          @click="goDetail(item.id, item.status)"
        >
          <div class="table-num">
            {{ idx + 1 }}
          </div>
          <div class="teble-info">
            <div class="table-status">{{ TableStatus[item.status] }}</div>
            <div class="table-cpacity">{{ TableCpacity[item.cpacity] }}</div>
          </div>
        </div>
      </div>

      <div class="table-detail">
        <div class="table-oper">
          <div class="oper-btn" v-for="item in state.operBtns" :key="item.id" @click="item.func">
            {{ item.label }}
          </div>
        </div>
        <!-- <div class="table-info">
          <div class="t-name">{{ state.itemDetail.name }}</div>
          <div class="t-total">{{ state.itemDetail.total }}</div>
        </div> -->
        <table-card class="table-card" :table-id="state.curtable" />
      </div>
    </div>
    <set-table-dialog :visible="state.visible.setTableVis" @cancel="handleCancel" :table-id="state.curtable" />
    <change-table-dialog
      :visible="state.visible.changeTableVis"
      @cancel="state.visible.changeTableVis = false"
      :table-id="state.curtable"
    />
  </div>
</template>

<script lang="ts" setup name="Home">
import { reactive } from "vue";
import { TableStatus, TableCpacity } from "./enum";
import TableCard from "./components/tableCard.vue";
import { useRouter } from "vue-router";
import SetTableDialog from "./components/setTableDialog.vue";
import { ElMessage } from "element-plus";
import ChangeTableDialog from "./components/ChangeTableDialog.vue";

const router = useRouter();
const state = reactive({
  list: [
    {
      id: "table1",
      tableNum: 1,
      status: "empty",
      cpacity: 0
    },
    {
      id: "table2",
      tableNum: 2,
      status: "empty",
      cpacity: 1
    },
    {
      id: "table3",
      tableNum: 3,
      status: "atdinner",
      cpacity: 1
    },
    {
      id: "table4",
      tableNum: 4,
      status: "empty",
      cpacity: 2
    },
    {
      id: "table5",
      tableNum: 5,
      status: "empty",
      cpacity: 2
    },
    {
      id: "table6",
      tableNum: 6,
      status: "empty",
      cpacity: 0
    },
    {
      id: "table7",
      tableNum: 7,
      status: "atdinner",
      cpacity: 1
    },
    {
      id: "table8",
      tableNum: 8,
      status: "atdinner",
      cpacity: 1
    },
    {
      id: "table9",
      tableNum: 9,
      status: "empty",
      cpacity: 2
    }
    // {
    //   id: "table10",
    //   tableNum: 10,
    //   status: "empty",
    //   cpacity: 2
    // }
  ],
  operBtns: [
    { id: 1, label: "点菜", func: handleOrder },
    { id: 2, label: "换桌", func: handleSwitch },
    { id: 3, label: "结账", func: handlePay }
  ],
  itemDetail: {
    name: "1号桌",
    id: 1,
    total: "￥250",
    orderList: [
      { id: 1, name: "猪蹄炖萝卜", num: 1, price: "￥125" },
      { id: 2, name: "焖牛腩", num: 1, price: "￥175" },
      { id: 3, name: "紫菜汤", num: 1, price: "￥25" }
    ]
  },
  curtable: "",
  visible: {
    setTableVis: false,
    changeTableVis: false
  }
});

/**
 * @desc 获取餐桌状态样式
 */
function getStatusSyle(status: string) {
  return status;
}

/**
 * @desc 前往餐桌详情
 */
function goDetail(id: string, status: string) {
  state.curtable = id;
  if (status === "empty") {
    state.visible.setTableVis = true;
    return;
  }
}

/**
 * @desc 换桌
 */
function handleSwitch() {
  state.visible.changeTableVis = true;
}

/**
 * @desc 结账
 */
function handlePay() {
  console.log("结账");
}

/**
 * @desc 点菜
 */
function handleOrder() {
  if (!state.curtable) {
    ElMessage.warning("请先选择餐桌");
    return;
  }
  let tNum = state.list?.find(i => i.id === state.curtable)?.tableNum;
  router.push({ name: "OrderFood", params: { id: state.curtable, tNum: tNum } });
}

/**
 * @desc 关闭开台弹窗
 */
function handleCancel() {
  state.visible.setTableVis = false;
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  display: flex;
  .top {
    display: flex;
    // flex-wrap: wrap;
    // height: 0;
  }
  .table-item {
    width: 200px;
    height: 150px;
    opacity: 1;
    border-radius: 20px;
    box-shadow: 0px 12px 23px rgba(62, 73, 84, 0.04);
    margin-right: 10px;
    padding: 20px;
    cursor: pointer;
    color: rgb(27, 25, 25);
    margin-bottom: 20px;
    .table-num {
      display: flex;
      justify-content: center;
      align-items: center;
      // /** 文本1 */
      font-size: 40px;
      font-weight: 600;
      letter-spacing: 0px;
      line-height: 56px;
      text-align: left;
      vertical-align: top;
    }
  }
  /** 餐桌状态 */
  .empty {
    background: rgba(255, 255, 255, 1);
  }
  .atdinner {
    background: rgba(233, 255, 239, 1);
  }
  .uncleared {
    background: rgb(238, 151, 132);
  }
  .curTable {
    background: rgb(89, 131, 120);
  }
  .table-item:hover {
    background: var(--el-menu-active-bg-color);
  }
  .teble-info {
    display: flex;
    justify-content: space-between;
  }
  .list {
    width: calc(100% - 300px);
    display: flex;
    flex-wrap: wrap;
    height: 0;
  }
  .table-detail {
    width: 350px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    box-shadow: 0px 12px 23px rgba(62, 73, 84, 0.04);
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    .table-oper {
      display: flex;
      text-align: center;
      margin-bottom: 10px;

      .oper-btn {
        width: 30%;
        padding: 20px;
      }
      .oper-btn:hover {
        // border-bottom: 1px solid;
        // color: rgb(0, 102, 255);
        cursor: pointer;
        background: var(--el-menu-active-bg-color);
        // color: #fff;
      }
    }

    .table-info {
      display: flex;
    }
    .table-card {
      flex: 1;
    }
  }
}
</style>
