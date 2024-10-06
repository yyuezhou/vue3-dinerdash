<template>
  <div class="dataVisualize-box">
    <div class="card top-box">
      <div class="top-title">数据可视化</div>
      <el-tabs v-model="tabActive" class="demo-tabs" @tab-change="tabChange">
        <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="top-content">
        <el-row :gutter="40">
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="item-center">
              <div class="gitee-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_person.png" alt="" />
                </div>
                <span class="item-value">{{ state.data.one }}</span>
                <span class="traffic-name sle">销售金额</span>
              </div>
              <div class="today-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/today.png" alt="" />
                </div>
                <span class="item-value">{{ state.data.two }}</span>
                <span class="traffic-name sle">折扣额</span>
              </div>
              <div class="gitHub-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_team.png" alt="" />
                </div>
                <span class="item-value">{{ state.data.four }}</span>
                <span class="traffic-name sle">单均消费</span>
              </div>
              <div class="yesterday-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/book_sum.png" alt="" />
                </div>
                <span class="item-value">{{ state.data.three }}</span>
                <span class="traffic-name sle">人均消费</span>
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
            <div class="item-right">
              <div class="echarts-title">菜品类别销量</div>
              <div class="book-echarts">
                <Pie ref="pieRef" :pie-data="state.pieData" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card bottom-box">
      <div class="bottom-title">菜品销售量</div>
      <div class="bottom-tabs">
        <el-tabs v-model="tabActive" class="demo-tabs" @tab-change="tabChange">
          <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="curve-echarts">
        <Curve ref="curveRef" :curve-data="state.curveData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataVisualize">
import { reactive, ref } from "vue";
import Pie from "./components/pie.vue";
import Curve from "./components/curve.vue";
import Mock from "mockjs";

const Random = Mock.Random;

const tabActive = ref(1);

const tab = [
  { label: "未来7日", name: 1 },
  { label: "近七日", name: 2 },
  { label: "近一月", name: 3 },
  { label: "近三月", name: 4 },
  { label: "近半年", name: 5 },
  { label: "近一年", name: 6 }
];

const state = reactive({
  data: {} as any,
  pieData: [] as any,
  curveData: [] as any
});
function getData() {
  state.data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    id: "@id",
    one: Random.float(1000, 99999).toFixed(2),
    get: Random.integer(0, 9990),
    pay: Random.integer(0, 9990),
    two: Random.float(0, 999).toFixed(2),
    three: Random.float(0, 500).toFixed(2),
    four: Random.float(200, 500).toFixed(2),
    five: Random.integer(0, 9990),
    six: Random.integer(0, 9990),
    seven: Random.integer(0, 9990),
    eight: Random.integer(0, 9990),
    night: Random.integer(0, 9990),
    ten: Random.integer(0, 9990),
    ele: Random.integer(0, 9990),
    createTime: "@datetime",
    username: "@cname",
    fp: "是",
    remarks: "@sentence"
  });
  state.pieData = Mock.mock([
    {
      value: Random.integer(0, 9990),
      name: "热菜"
    },
    {
      value: Random.integer(0, 9990),
      name: "主食"
    },
    {
      value: Random.integer(0, 9990),
      name: "酒水"
    },
    {
      value: Random.integer(0, 9990),
      name: "凉菜"
    }
  ]);
  state.curveData = Mock.mock([
    {
      value: Random.integer(0, 999),
      spotName: "佛跳墙"
    },
    {
      value: Random.integer(0, 999),
      spotName: "西红柿炒鸡蛋"
    },
    {
      value: Random.integer(0, 999),
      spotName: "江米酿鸭子"
    },
    {
      value: Random.integer(0, 999),
      spotName: "水煮鱼"
    },
    {
      value: Random.integer(0, 999),
      spotName: "青椒炒肉丝"
    },
    {
      value: Random.integer(0, 999),
      spotName: "玉米排骨汤"
    },
    {
      value: Random.integer(0, 999),
      spotName: "宫保鸡丁"
    },
    {
      value: Random.integer(0, 999),
      spotName: "红烧鱼"
    },
    {
      value: Random.integer(0, 999),
      spotName: "炒菜心"
    }
  ]);
}
function tabChange() {
  getData();
}
getData();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
