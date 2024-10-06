<template>
  <div>
    <Dialog
      :visible="props.visible"
      :dialog-prop="state.dialogProp"
      @cancel="handleCancel"
      :submit-text="'开台'"
      @submit="handleSubmit"
    >
      <form-create v-model:api="state.fApi" :rule="state.rule" :option="state.option" :value="state.value" />
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import Dialog from "@/components/Dialog/index.vue";
import { reactive } from "vue";
import _ from "lodash";
import { useRouter } from "vue-router";

const props = defineProps<{ visible: boolean; tableId: string }>();
const emit = defineEmits(["cancel"]);
const router = useRouter();
const state = reactive({
  dialogProp: {
    width: "600px"
  },
  fApi: {} as any,
  //组件参数配置
  option: {
    submitBtn: false
  },
  //表单生成规则
  rule: [
    {
      type: "inputNumber",
      field: "peopleNum",
      title: "人数",
      effect: {
        required: true
      },
      props: {
        max: 12,
        min: 1
      }
    },
    {
      type: "select",
      field: "workerId",
      title: "服务员",
      options: [
        {
          value: "1",
          label: "张三"
        },
        {
          value: "2",
          label: "李四"
        },
        {
          label: "王五",
          value: "3"
        }
      ]
    },
    {
      type: "select",
      field: "tableID",
      title: "桌号",
      options: [
        {
          value: "1",
          label: "1号桌"
        },
        {
          value: "2",
          label: "2号桌"
        },
        {
          label: "3号桌",
          value: "3"
        },
        {
          label: "4号桌",
          value: "4"
        },
        {
          label: "5号桌",
          value: "5"
        },
        {
          label: "6号桌",
          value: "6"
        },
        {
          label: "7号桌",
          value: "7"
        },
        {
          label: "8号桌",
          value: "8"
        },
        {
          label: "9号桌",
          value: "9"
        }
      ]
    }
  ],
  //表单数据
  value: {}
});

function handleCancel() {
  emit("cancel");
}

/**
 * @desc 开台
 */
function handleSubmit() {
  state.fApi.validate(valid => {
    if (_.isBoolean(valid) && valid) {
      emit("cancel");
      state.fApi.resetFields();
      router.push({ name: "OrderFood", params: { id: props.tableId, cap: 8 } });
    }
  });
}

defineExpose({
  fApi: state.fApi
});
</script>
<style scoped lang="scss">
:deep(.el-form) {
  .el-form-item__content {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .el-input {
    width: 100%;
  }
  .el-input-number {
    width: 100%;
  }
}
</style>
