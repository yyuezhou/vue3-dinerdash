<template>
  <div>
    <Dialog
      :visible="props.visible"
      :dialog-prop="state.dialogProp"
      @cancel="handleCancel"
      :submit-text="'换桌'"
      @submit="handleSubmit"
      @open="handleOpen"
    >
      <form-create v-model:api="state.fApi" :rule="state.rule" :option="state.option" :value="state.value" />
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import Dialog from "@/components/Dialog/index.vue";
import { ElMessage } from "element-plus";
import { reactive } from "vue";

const props = defineProps<{ visible: boolean; tableId: string }>();
const emit = defineEmits(["cancel"]);
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
      type: "input",
      field: "tableNum",
      title: "当前桌号",
      className: "readonly-input"
    },
    {
      type: "select",
      field: "tableID",
      title: "更换到桌号",
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
  state.fApi.resetFields();
}

async function handleOpen() {
  state.value = {
    tableNum: "3号桌",
    tableID: "2"
  };
  setTimeout(() => {
    state.fApi.setValue(state.value);
  }, 1000);

  //   console.log("state.fApi.setValue: ", state.fApi.setValue);
}

/**
 * @desc 换桌
 */
function handleSubmit() {
  emit("cancel");
  state.fApi.resetFields();
  ElMessage.success("换桌成功");
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
<style lang="scss">
.readonly-input {
  .el-input__wrapper {
    border: none;
    color: red;
  }
}
</style>
