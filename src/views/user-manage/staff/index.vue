<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getData"
      :init-param="initParam"
      :data-callback="dataCallback"
      @darg-sort="sortTable"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
        <el-button v-auth="'batchAdd'" type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button>
        <el-button v-auth="'export'" type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
        <el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button>
      </template>
      <!-- Expand -->
      <template #expand="{ row }">
        <div class="user-info">
          用户名： {{ row.username }} 地址：{{ row.address }} 性别{{ row.gender }} 邮箱： {{ row.email }}
        </div>
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
        <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
    <ImportExcel ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="Staff">
import { ref, reactive } from "vue";
import { User } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import { ElMessage, ElMessageBox } from "element-plus";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from "@element-plus/icons-vue";
import {
  //   getUserList,
  deleteUser,
  editUser,
  addUser,
  resetUserPassWord,
  exportUserInfo,
  BatchAddUser
  //   getUserGender
} from "@/api/modules/user";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
// const getTableList = (params: any) => {
//   let newParams = JSON.parse(JSON.stringify(params));
//   newParams.createTime && (newParams.startTime = newParams.createTime[0]);
//   newParams.createTime && (newParams.endTime = newParams.createTime[1]);
//   delete newParams.createTime;
//   return getUserList(newParams);
// };// mock表格数据使用
// export const getTableData = () => {
//   return new Promise(resolve => {
//     resolve({
//       code: 200,
//       data: [
//         {
//           weight: 1,
//           name: '测试数据一',
//           sex: '0',
//           status: '正常'
//         },
//         {
//           weight: 2,
//           name: '测试数据二',
//           sex: '1',
//           status: '正常'
//         }
//       ]
//     })
//   })
// }

function getData() {
  return new Promise(resolve => {
    resolve({
      data: {
        list: [
          {
            id: 1,
            username: "张蒙蒙",
            telephone: "15945671245",
            roleID: "经理",
            avatar: "https://n.sinaimg.cn/sinakd20107/448/w1024h1024/20230405/78c3-d76122768696431ca991667988c74ada.jpg"
          },
          {
            id: 2,
            username: "李思思",
            telephone: "19985462154",
            roleID: "普通职员",
            avatar:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F53a8e5ee-4c21-4e22-8bea-1562a9174650%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715485188&t=1519d2459c3d9efbfa00a6c4df04c796"
          },
          {
            id: 3,
            username: "王豆豆",
            telephone: "15614725612",
            roleID: "普通职员",
            avatar: "https://n.sinaimg.cn/sinakd20107/448/w1024h1024/20230405/7fff-f47dbe6543e71a59f1265a5bb943f3c9.jpg"
          },
          {
            id: 4,
            username: "周杰伦",
            telephone: "1681324589",
            roleID: "经理",
            avatar:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F19f0a9b5-3ff2-4036-ac1f-324498b3b631%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715485311&t=8037fa54ab58ffe58995c145deecfde3"
          },
          {
            id: 5,
            username: "小11",
            telephone: "17745841257",
            roleID: "普通职员",
            avatar: "http://img1.baidu.com/it/u=1158462197,362532000&fm=253&app=138&f=JPEG?w=800&h=800"
          },
          {
            id: 5,
            username: "王思聪",
            telephone: "17745841257",
            roleID: "普通职员",
            avatar:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ff831eb88-0b67-455b-a299-602d415481d5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715485384&t=692fcf5c9cf22ed513723dc4b599a8bb"
          },
          {
            id: 5,
            username: "蔡依林",
            telephone: "17745841257",
            roleID: "普通职员",
            avatar:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F1e5ae523-fef8-4fc3-b23d-48ac9dddf495%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715485384&t=03a0a219b53aded5ee17336c08c204ee"
          },
          {
            id: 6,
            username: "夏雪雪",
            telephone: "17745841257",
            roleID: "普通职员",
            avatar:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fda71cd11-306d-4295-82df-f2084d990183%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715485384&t=7f2b5675677d64c68ae92d639a6cbe45"
          },
          {
            id: 55,
            username: "武泽天",
            telephone: "17745841257",
            roleID: "普通职员",
            avatar:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fda71cd11-306d-4295-82df-f2084d990183%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715485384&t=7f2b5675677d64c68ae92d639a6cbe45"
          },
          {
            id: 56,
            username: "王思聪",
            telephone: "17745841257",
            roleID: "普通职员",
            avatar:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fb02488ee-0650-436a-90f8-bd30de9509fe%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715485312&t=3e1e6689ef9c25f302de3bbf8a5172af"
          },
          {
            id: 75,
            username: "王思聪",
            telephone: "17745841257",
            roleID: "普通职员",
            avatar:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fe665f1a3-f9f8-4695-8cb5-19e019b34d54%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715485311&t=079efbcc0aa5e3b36a1108f5013dd95d"
          },
          {
            id: 53,
            username: "王思聪",
            telephone: "17745841257",
            roleID: "普通职员",
            avatar:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F104ff3ad-48cd-411a-b6b5-c13a1ec41a9c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715485311&t=25e846fab31ba1a8e46a7b416a645e08"
          },
          {
            id: 533,
            username: "王思聪",
            telephone: "17745841257",
            roleID: "普通职员",
            avatar:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F92bb98d5-f595-4954-92cb-23c1c50be302%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715485311&t=1e3ca6c06b334548d695baad522fcfb9"
          }
        ],
        pageNum: 1,
        pageSize: 10,
        total: 15
      }
    });
  });
}
// 表格配置项
const columns = reactive<ColumnProps<User.ResUserList>[]>([
  { type: "selection", fixed: "left", width: 70 },
  {
    prop: "username",
    label: "用户姓名",
    search: { el: "input", tooltip: "我是搜索提示" }
  },
  {
    prop: "telephone",
    label: "手机号码"
  },
  {
    prop: "roleID",
    label: "职位"
  },
  //   {
  //     prop: "aa",
  //     label: "职位",
  // 字典数据（本地数据）
  // enum: genderType,
  // 字典请求不带参数
  // enum: getUserGender,
  // 字典请求携带参数
  // enum: () => getUserGender({ id: 1 }),
  // search: { el: "select", props: { filterable: true } },
  // fieldNames: { label: "label", value: "value" }
  //   },
  { prop: "operation", label: "操作", fixed: "right", width: 330 }
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

// 重置用户密码
const resetPass = async (params: User.ResUserList) => {
  await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
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
