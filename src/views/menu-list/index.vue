<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getTableList"
      :init-param="initParam"
      :data-callback="dataCallback"
      @darg-sort="sortTable"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
        <el-button v-auth="'batchAdd'" type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button>
        <el-button v-auth="'export'" type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增菜品</el-button>
      </template>
      <!-- Expand -->
      <template #expand="{ row }">
        <div class="user-info">
          用户名： {{ row.username }} 地址：{{ row.address }} 性别{{ row.gender }} 邮箱： {{ row.email }}
        </div>
      </template>
      <template #picture="{ row }">
        <el-image style="width: 100px; height: 100px" :src="row.picture" fit="scale-down" />
      </template>
      <!-- createTime -->
      <template #createTime="scope">
        <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
          {{ scope.row.createTime }}
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <food-drawer ref="drawerRef" />
    <ImportExcel ref="dialogRef" />
  </div>
</template>

<script setup lang="ts" name="MenuList">
import { ref, reactive } from "vue";
import { User } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import { ElMessage, ElMessageBox } from "element-plus";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Download, Upload, View } from "@element-plus/icons-vue";
import { deleteUser, editUser, addUser, exportUserInfo, BatchAddUser } from "@/api/modules/user";
import FoodDrawer from "./components/FoodDrawer.vue";
import _ from "lodash";
// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

const urls = [
  "https://img.zcool.cn/community/01426c5e4ba900a80120a89573b7b8.jpg@1280w_1l_2o_100sh.jpg",
  "https://img.zcool.cn/community/01c42f6041e07c11013f37451b7b69.jpg@1280w_1l_2o_100sh.jpg",
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F511654%2Ff844273f12ad40fe8af4df39bf1b11f9.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNTExNjU0L2Y4NDQyNzNmMTJhZDQwZmU4YWY0ZGYzOWJmMWIxMWY5LmpwZw%3D%3D%2Fsign%2Faf6d18b2b71ccb4d953b7af53b6127b1.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715410965&t=e3b45f4dd73c399c74510db4879270f7",
  "https://5b0988e595225.cdn.sohucs.com/images/20200217/7381d764c52b4f68b4da5d8d13d128c3.jpeg",
  "https://img0.baidu.com/it/u=1836464636,4073559151&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=334",
  "https://img.zcool.cn/community/0104a25dd2931ea8012053c0285330.jpg@3000w_1l_2o_100sh.jpg",
  "https://img0.baidu.com/it/u=202081355,1361546874&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"
];
// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  console.log("data: ", data);
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = () => {
  return new Promise(resolve => {
    resolve({
      data: {
        list: [
          {
            picture: urls[_.random(0, urls.length - 1, false)],
            name: "糖醋排骨",
            description: "糖醋排骨的口感如同甘甜的醇酒，酱料的酸甜与肉质的鲜嫩完美平衡，让人沉醉其中，无法自拔。",
            price: "90",
            category_id: "1",
            status: "正常"
          },
          {
            picture: urls[_.random(0, urls.length - 1, false)],
            name: "水煮鱼",
            description:
              "水煮鱼以新鲜的鱼肉为主料，经过特殊的烹调制成的美味佳肴。鱼肉鲜嫩，味道麻辣可口，汤汁浓郁，散发出诱人的香气。",
            price: "128",
            category_id: "1",
            status: "正常"
          },
          {
            picture: urls[_.random(0, urls.length - 1, false)],
            name: "番茄炒鸡蛋",
            description: "红亮的色泽，油润的质感，每一口西红柿炒鸡蛋都带来甜美的滋味和丰富的营养。",
            price: "90",
            category_id: "1",
            status: "正常"
          },
          {
            picture: urls[_.random(0, urls.length - 1, false)],
            name: "炒菜心",
            description: "色香味俱佳的炒青菜，成为人们餐桌上一道不可或缺的美食，满足了人们对健康和美味的双重追求。",
            price: "28",
            category_id: "1",
            status: "正常"
          },
          {
            picture: urls[_.random(0, urls.length - 1, false)],
            name: "玉米排骨汤",
            description: "玉米炖排骨汤品鲜美可口，营养价值丰富，倍受人们喜爱。",
            price: "58",
            category_id: "1",
            status: "正常"
          }
        ]
      },
      pageNum: 1,
      pageSize: 10,
      total: 15
    });
  });
  //   let newParams = JSON.parse(JSON.stringify(params));
  //   newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  //   newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  //   delete newParams.createTime;
  //   return getUserList(newParams);
};

// 表格配置项
const columns = reactive<ColumnProps<User.ResUserList>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { prop: "picture", label: "菜品图片", fixed: "left", width: 200 },
  { prop: "name", label: "菜名", fixed: "left", width: 150 },
  { prop: "description", label: "描述", fixed: "left" },
  { prop: "price", label: "价格", fixed: "left", width: 150 },
  { prop: "category_id", label: "分类", fixed: "left", width: 150 },
  { prop: "status", label: "状态", fixed: "left", width: 150 },
  { prop: "operation", label: "操作", fixed: "right", width: 250 }
]);

// 表格拖拽排序
const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  console.log(newIndex, oldIndex);
  console.log(proTable.value?.tableData);
  ElMessage.success("修改列表排序成功");
};

// 删除用户信息
const deleteAccount = async (params: User.ResUserList) => {
  await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
  proTable.value?.getTableList();
};

// 导出用户列表
const downloadFile = async () => {
  ElMessageBox.confirm("确认导出用户数据?", "温馨提示", { type: "warning" }).then(() =>
    useDownload(exportUserInfo, "用户列表", proTable.value?.searchParam)
  );
};

// 批量添加用户
const dialogRef = ref<InstanceType<typeof ImportExcel> | null>(null);
const batchAdd = () => {
  const params = {
    title: "用户",
    tempApi: exportUserInfo,
    importApi: BatchAddUser,
    getTableList: proTable.value?.getTableList
  };
  dialogRef.value?.acceptParams(params);
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<User.ResUserList> = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: title === "新增" ? addUser : title === "编辑" ? editUser : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>

<style scoped lang="scss">
.user-info {
  padding: 10px 20px;
}
</style>
