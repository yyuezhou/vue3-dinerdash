<template>
  <div class="order-page">
    <!-- <div class="header">123</div> -->
    <div class="container">
      <div class="left-box">
        <div class="header">
          <div class="info">桌号/取餐号: {{ state.tableInfo.name }}号桌</div>
          <SvgIcon v-if="!state.isSettled" name="edit" :icon-style="state.iconStyle" class="edit" @click="handleEdit" />
        </div>
        <el-table :data="orderList" class="list">
          <el-table-column label="菜名" prop="name"></el-table-column>
          <el-table-column label="价格" prop="price">
            <template #default="{ row }">
              <div class="price">￥{{ row.price }}/份</div>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="num">
            <template #default="{ row }">
              <div class="num-col">
                <SvgIcon name="minus" :icon-style="state.iconStyle" class="icon" @click="changeNum(row, 'minus')" />
                <el-input v-model="row.num" placeholder="请输入数量" class="test"></el-input>
                <SvgIcon name="add" :icon-style="state.iconStyle" class="icon" @click="changeNum(row, 'add')" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom">
          <div class="left">
            共{{ terms }}项 <span class="total">{{ total }}</span> 元
          </div>
          <div class="right">
            <div class="pay-btn" @click="handleSettle">结算</div>
          </div>
        </div>
      </div>
      <div class="right-box">
        <pay-comp v-if="state.isSettled" :member-id="state.memberID" :total="total" @close="closeTab" />
        <div v-else class="list">
          <div v-for="(items, i) in FoodOpts" :key="i" class="cate-box">
            <h3>{{ items.label }}</h3>
            <div class="foot-list" v-if="groupBy(state.menu.data, 'type')[items.value]">
              <div
                v-for="(item, idx) in groupBy(state.menu.data, 'type')[items.value]"
                :key="idx"
                class="food-item"
                @click="addMenu(item)"
              >
                <div class="food-name">{{ item.name }}</div>
                <div class="food-price">{{ item.price }}</div>
              </div>
            </div>
            <div v-else class="food-item">暂无相关菜品</div>
          </div>

          <!-- <div v-for="item in state.menu.data" :key="item.id" class="food-item" @click="addMenu(item)">
            <div class="food-name">{{ item.name }}</div>
            <div class="food-price">{{ item.price }}</div>
            <h3>消耗品</h3>
          </div> -->
        </div>
      </div>
    </div>
    <edit-table-dialog :visible="state.visible.editTableVis" @cancel="handleCancle" />
  </div>
</template>
<script lang="ts" setup name="OrderFood">
import { computed, reactive, watch } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import EditTableDialog from "./components/EditTableDialog.vue";
import _ from "lodash";
import { ElMessageBox } from "element-plus";
import PayComp from "./components/PayComp.vue";
import { useRoute } from "vue-router";
import { enumToObjArray, FoodCategory } from "@/utils/type";
import { useTabsStore } from "@/stores/modules/tabs";

const route = useRoute();
const tabStore = useTabsStore();
const state = reactive({
  tableInfo: {
    id: "table1",
    name: "1号桌",
    capacity: 0
  },
  menu: {
    data: [
      { id: "food1", name: "红烧鱼", price: "68.00", type: "hot" },
      { id: "food4", name: "糖醋排骨", price: "68.00", type: "hot" },
      { id: "food2", name: "茶位", price: "2.00", type: "necessary" },
      { id: "food3", name: "纸巾", price: "1.00", type: "necessary" },
      { id: "food5", name: "炒菜心", price: "18.00", type: "hot" },
      { id: "food6", name: "佛跳墙", price: "180.00", type: "hot" },
      { id: "food7", name: "西红柿炒鸡蛋", price: "180.00", type: "hot" },
      { id: "food8", name: "江米酿鸭子", price: "180.00", type: "hot" },
      { id: "food10", name: "青椒炒肉丝", price: "180.00", type: "hot" },
      { id: "food11", name: "玉米排骨汤", price: "180.00", type: "hot" },
      { id: "food12", name: "炒菜心", price: "180.00", type: "hot" },
      { id: "food13", name: "炒牛河", price: "180.00", type: "mian" },
      { id: "food14", name: "米饭", price: "180.00", type: "mian" },
      { id: "food15", name: "杨枝甘露", price: "180.00", type: "sweet" },
      { id: "food16", name: "绿豆糖水", price: "180.00", type: "sweet" },
      { id: "food17", name: "拍黄瓜", price: "180.00", type: "cold" },
      { id: "food18", name: "凉拌皮蛋", price: "180.00", type: "cold" },
      { id: "food19", name: "去骨鸡爪", price: "180.00", type: "cold" }
    ]
  },
  orderList: [] as any,
  iconStyle: {
    width: "20px",
    height: "20px"
  },
  visible: {
    editTableVis: false
  },
  orderAmount: {
    terms: 0,
    total: 0
  },
  isSettled: false,
  memberID: "1"
});
const FoodOpts = enumToObjArray(FoodCategory);
const orderList = computed(() => state.orderList.filter(i => i.num > 0)); // 只显示菜品数量>0的
const terms = computed(() => _.sumBy(state.orderList, "num")); // 计算总项
const total = computed(() => {
  return state.orderList.reduce((total, item) => {
    return total + _.toFinite(item.price) * item.num;
  }, 0);
});
watch(
  () => route.params,
  (p: any) => {
    console.log("route.params: ", route);
    getTableInfo(p.id);
    // state.tableInfo = {
    //   id: p.id,
    //   name: p.tNum
    // };
  },
  { immediate: true }
);
/**
 * @description 增加菜品
 */
function addMenu(item: any) {
  const isExist = orderList.value.find(o => o.id === item.id);
  if (isExist) {
    isExist.num++;
  } else {
    state.orderList.push({ ...item, num: 1 });
  }
}

/**
 * @desc 修改菜品数量
 */
function changeNum(row: any, type: string) {
  if (type === "minus") {
    row.num -= 1;
  }
  if (type === "add") {
    row.num += 1;
  }
}

/**
 * @desc 编辑
 */
function handleEdit() {
  state.visible.editTableVis = true;
  console.log("state.visible.editTableVis: ", state.visible.editTableVis);
}

/**
 * @desc 关闭弹窗
 */
function handleCancle() {
  state.visible.editTableVis = false;
}

/**
 * @desc 结算
 */
function handleSettle() {
  if (state.isSettled) return;
  ElMessageBox.prompt("请输入会员号", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(({ value }) => {
    state.isSettled = true;
    state.memberID = value;
  });
}
/**
 * @desc 菜品分类
 */
function groupBy(array, key) {
  return array.reduce((result, currentItem) => {
    // 使用 group 字段作为键来分组数据
    // 确保 result 对象中有对应键
    (result[currentItem[key]] = result[currentItem[key]] || []).push(currentItem);
    return result;
  }, {});
}

/**
 * @desc 关闭当前标签页
 */
function closeTab() {
  tabStore.removeTabs(route.fullPath);
}

/**
 * @desc 获取餐桌信息
 */
function getTableInfo(id: string) {
  state.tableInfo = {
    id,
    name: "",
    capacity: 8
  };
  state.orderList = [{ id: "food2", name: "茶位", price: "2.00", type: "necessary", num: 8 }];
}
</script>
<style lang="scss" scoped>
.order-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  .container {
    display: flex;
    flex: 1;
    height: 100%;
  }
  .left-box {
    // padding: 15px 20px;
    width: 430px;
    margin-right: 15px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    box-shadow: 0px 12px 23px rgba(62, 73, 84, 0.04);
    display: flex;
    flex-direction: column;
    .list {
      flex: 1;
    }
    .header {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px 0 20px;
      .edit {
        cursor: pointer;
        color: red;
      }
    }
    .price {
      color: red;
    }
  }
  .right-box {
    flex: 1;
    overflow: scroll;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 10px 20px;
    .list {
      //   display: flex;
      //   flex-wrap: wrap;
      //   .cate-box {
      //     display: flex;
      //   }
      .foot-list {
        display: flex;
        flex-wrap: wrap;
      }
    }
    .food-item {
      width: 150px;
      height: 110px;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
      //   box-shadow: 0px 12px 23px rgba(62, 73, 84, 0.04);
      box-shadow: 2px 2px 20px 2px rgba(0, 0, 0, 0.1);
      padding: 20px;
      margin-bottom: 20px;
      margin-right: 10px;
      cursor: pointer;
    }
    .food-item:hover {
      background: var(--el-menu-active-bg-color);
    }
  }
  .bottom {
    background-color: rgb(255, 226, 171);
    border-radius: 0 0 10px 10px;
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    .total {
      color: red;
      margin-left: 10px;
    }
    .pay-btn {
      background-color: rgb(253, 140, 34);
      height: 100%;
      width: 60px;
      text-align: center;
      color: #fff;
      border-radius: 0 0 10px;
      cursor: pointer;
    }
  }
  .num-col {
    display: flex;
    .icon {
      margin: auto 5px;
      cursor: pointer;
    }
    .icon:hover {
      background: var(--el-menu-active-bg-color);
    }
  }
}
</style>
<style lang="scss">
.order-page {
  .num-col {
    display: flex;
  }
}
</style>
