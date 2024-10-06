<template>
  <div class="pay-comp">
    <div class="header"><h3>账单</h3></div>
    <div class="member-info">
      <el-descriptions class="margin-top" :column="2" :size="size" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              会员卡号
            </div>
          </template>
          {{ state.memberInfo.ID }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              会员姓名
            </div>
          </template>
          {{ state.memberInfo.username }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <location />
              </el-icon>
              余额
            </div>
          </template>
          {{ state.memberInfo.amount }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <tickets />
              </el-icon>
              剩余积分
            </div>
          </template>
          {{ state.memberInfo.points }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              折扣金额
            </div>
          </template>
          {{ state.memberInfo.discount }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              消费合计
            </div>
          </template>
          {{ props.total }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              备注
            </div>
          </template>
          {{ state.memberInfo.remarks }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="pay-box">
      <h3>结算方式</h3>
      <div class="pay-way">
        <div v-for="item in state.payList" :key="item.id" class="pay-item">
          <SvgIcon :name="item.name" :icon-style="state.iconStyle" @click="handlePay(item.id)" /> {{ item.desc }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, reactive, watch } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const size = ref("default");
const router = useRouter();
const props = defineProps<{ memberId: string; total: number }>();
const emit = defineEmits(["close"]);
const state = reactive({
  iconStyle: {
    width: "50px",
    height: "50px"
  },
  payList: [
    {
      id: "wechat",
      name: "wechatPay",
      desc: "微信支付"
    },
    {
      id: "aliPay",
      name: "aliPay",
      desc: "支付宝"
    },
    {
      id: "bankPay",
      name: "bankPay",
      desc: "银联"
    },
    {
      id: "cashPay",
      name: "cashPay",
      desc: "现金"
    },
    {
      id: "accountPay",
      name: "accountPay",
      desc: "账户余额"
    }
  ],
  memberInfo: {} as any
});
const iconStyle = computed(() => {
  const marginMap = {
    large: "8px",
    default: "6px",
    small: "4px"
  };
  return {
    marginRight: marginMap[size.value] || marginMap.default
  };
});

/**
 * @desc 支付
 */
function handlePay(id: string) {
  console.log("id: ", id);
  ElMessageBox.confirm("请完成支付", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    ElMessage.success({ message: `支付成功！将在3秒后回到首页` });
    setTimeout(() => {
      router.push({ name: "Home" });
      emit("close");
    }, 3000);
  });
}

/**
 * @desc 获取会员信息
 */
function getMemberInfo(ID: string) {
  console.log("ID: ", ID);
  state.memberInfo = {
    ID,
    username: "张三",
    amount: "￥510.00",
    points: "3590",
    discount: "￥5.10",
    total: "￥225.00",
    remarks: "无"
  };
}
/**
 * @desc 监听会员号
 */
watch(
  () => props?.memberId,
  val => {
    console.log("val: ", val);
    getMemberInfo(val);
  },
  { immediate: true }
);
</script>
<style scoped lang="scss">
.pay-comp {
  margin-right: 15px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  box-shadow: 0px 12px 23px rgba(62, 73, 84, 0.04);
  padding: 10px 20px;
  height: 100%;
  .pay-box {
    .pay-way {
      display: flex;
      .pay-item {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        padding: 10px;
        border-radius: 15px;
        align-items: center;
        width: 80px;
      }
      .pay-item:hover {
        background-color: var(--el-menu-active-bg-color);
        color: green;
      }
    }
  }
}
</style>
