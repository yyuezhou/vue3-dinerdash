<template>
  <div class="table-box">
    <!-- 查询表单 -->
    <el-form :model="state.formModel">
      <el-form-item label="订单号" prop="orderID">
        <el-input class="search-input" v-model="state.formModel.orderID" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-button type="primary" @click="getData">搜索</el-button>
    </el-form>

    <div class="order-item" v-for="items in state.data" :key="items.id">
      <div class="header">
        <div class="card-header">
          <span>张三三</span>
        </div>
      </div>

      <el-divider />
      <div class="list" v-for="item in items.orderList" :key="item.id">
        <div class="item">{{ item.name }}</div>
        <div class="item">￥{{ item.price }}</div>
        <div class="item">×{{ item.num }}</div>
        <div class="item-last">￥{{ item.price * item.num }}</div>
      </div>
      <div class="total">总计：￥{{ getTotal(items.orderList) }}-会员折扣：优惠0.00=￥{{ getTotal(items.orderList) }}元</div>

      <el-divider />
      <div class="footer">
        <div class="row">
          <div>支付方式</div>
          <div>{{ getEnumKey(PayWay, items.payment) }}</div>
        </div>
        <div class="row">
          <div>用餐人数</div>
          <div>{{ items.peopleNum }}</div>
        </div>
        <div class="row">
          <div>下单时间</div>
          <div>{{ items.orderDateTime }}</div>
        </div>
        <div class="row">
          <div>订单号</div>
          <div>{{ items.orderID }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="OrderList">
import _ from "lodash";
import { reactive, onMounted } from "vue";
import { PayWay, getEnumKey } from "@/utils/type";

const state = reactive({
  data: [] as any,
  formModel: {} as any
});

/**
 * @desc 获取数据
 */
function getData() {
  state.data = [
    {
      id: 1,
      total: "￥250",
      orderList: [
        { id: 1, name: "猪蹄炖萝卜", num: 1, price: "125" },
        { id: 2, name: "焖牛腩", num: 3, price: "175" },
        { id: 3, name: "紫菜汤", num: 2, price: "25" }
      ],
      payment: "0",
      peopleNum: 8,
      orderDateTime: "2024-01-03 15:22:06",
      orderID: "2024013003256826548964"
    },
    {
      id: 2,
      total: "￥250",
      orderList: [
        { id: 1, name: "猪蹄炖萝卜", num: 1, price: "125" },
        { id: 2, name: "焖牛腩", num: 1, price: "175" },
        { id: 3, name: "紫菜汤", num: 2, price: "25" }
      ],
      payment: "3",
      peopleNum: 8,
      orderDateTime: "2024-01-03 15:22:06",
      orderID: "2024013003256826548964"
    },
    {
      id: 3,
      total: "￥250",
      orderList: [
        { id: 3, name: "紫菜汤", num: 1, price: "25" },
        { id: 2, name: "焖牛腩", num: 5, price: "175" },
        { id: 1, name: "猪蹄炖萝卜", num: 1, price: "125" }
      ],
      payment: "4",
      peopleNum: 8,
      orderDateTime: "2024-01-03 15:22:06",
      orderID: "2024013003256826548964"
    },
    {
      id: 4,
      total: "￥250",
      orderList: [
        { id: 3, name: "紫菜汤", num: 1, price: "25" },
        { id: 1, name: "猪蹄炖萝卜", num: 1, price: "125" },
        { id: 2, name: "焖牛腩", num: 5, price: "175" }
      ],
      payment: "1",
      peopleNum: 8,
      orderDateTime: "2024-01-03 15:22:06",
      orderID: "2024013003256826548964"
    },
    {
      id: 5,
      total: "￥250",
      orderList: [
        { id: 2, name: "焖牛腩", num: 5, price: "175" },
        { id: 1, name: "猪蹄炖萝卜", num: 1, price: "125" },
        { id: 3, name: "紫菜汤", num: 1, price: "25" }
      ],
      payment: "2",
      peopleNum: 8,
      orderDateTime: "2024-01-03 15:22:06",
      orderID: "2024013003256826548964"
    },
    {
      id: 6,
      total: "￥250",
      orderList: [
        { id: 1, name: "猪蹄炖萝卜", num: 1, price: "125" },
        { id: 3, name: "紫菜汤", num: 1, price: "25" }
      ],
      payment: "2",
      peopleNum: 8,
      orderDateTime: "2024-01-03 15:22:06",
      orderID: "2024013003256826548964"
    },
    {
      id: 7,
      total: "￥250",
      orderList: [
        { id: 2, name: "焖牛腩", num: 5, price: "175" },
        { id: 3, name: "紫菜汤", num: 1, price: "25" }
      ],
      payment: "2",
      peopleNum: 8,
      orderDateTime: "2024-01-03 15:22:06",
      orderID: "2024013003256826548964"
    },
    {
      id: 8,
      total: "￥250",
      orderList: [
        { id: 1, name: "猪蹄炖萝卜", num: 1, price: "125" },
        { id: 2, name: "焖牛腩", num: 5, price: "175" }
      ],
      payment: "2",
      peopleNum: 8,
      orderDateTime: "2024-01-03 15:22:06",
      orderID: "2024013003256826548964"
    },
    {
      id: 9,
      total: "￥250",
      orderList: [
        { id: 1, name: "猪蹄炖萝卜", num: 1, price: "125" },
        { id: 2, name: "焖牛腩", num: 5, price: "175" },
        { id: 3, name: "紫菜汤", num: 1, price: "25" },
        { id: 4, name: "佛跳墙", num: 2, price: "125" }
      ],
      payment: "2",
      peopleNum: 8,
      orderDateTime: "2024-01-03 15:22:06",
      orderID: "2024013003256826548964"
    },
    {
      id: 22,
      total: "￥250",
      orderList: [
        { id: 1, name: "猪蹄炖萝卜", num: 1, price: "125" },
        { id: 2, name: "焖牛腩", num: 5, price: "175" },
        { id: 3, name: "紫菜汤", num: 1, price: "25" }
      ],
      payment: "2",
      peopleNum: 8,
      orderDateTime: "2024-01-03 15:22:06",
      orderID: "2024013003256826548964"
    }
  ];
  state.data = _.shuffle(state.data);
}

function getTotal(list) {
  list.map(i => (i.total = i.price * i.num));
  return _.sumBy(list, "total");
}
onMounted(() => {
  getData();
});
</script>

<style scoped lang="scss">
.table-box {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 10px 20px;
  flex: 1;
  overflow: scroll;
  font-family: "Microsoft YaHei";
  .el-form {
    display: flex;
  }
  .search-input {
    width: 250px;
    margin-right: 15px;
  }
  .order-item {
    margin-right: 30px;
    margin-bottom: 20px;
    /* box-shadow: 水平阴影 垂直阴影 
			  模糊距离 阴影尺寸 阴影颜色 内外阴影；*/
    box-shadow: 2px 2px 20px 2px rgba(0, 0, 0, 0.295);
    padding: 10px;
    border-radius: 5px;
  }
  .list {
    display: flex;
    font-size: 16px;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
    .item {
      flex: 0 0 32%; /* 每列占据父容器宽度的25% */
      text-align: left;
      //   padding: 10px;
    }
    .item-last {
      text-align: right;
    }
  }
  .total {
    color: red;
    text-align: right;
  }
  .footer {
    .row {
      display: flex;
      justify-content: space-between;
    }
  }
}
.user-info {
  padding: 10px 20px;
}
.el-divider {
  margin: 5px;
}
</style>
