<template>
  <div class="flex-st">
    <el-dialog
      ref="elDialogRef"
      :class="props.class ? props.class + ' fits-dialog' : 'fits-dialog'"
      :close-on-click-modal="false"
      v-bind="dialogProp"
      v-model="isVisible"
      @close="emitcancel"
    >
      <!-- dialog的头部插槽 -->
      <template #header="{ close, titleId, titleClass }">
        <slot name="header" class="dialog-header" :close="close" :title-id="titleId" :title-class="titleClass" />
      </template>
      <!-- v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"-->
      <!-- dialog的内容 -->
      <div class="dialog-body">
        <el-scrollbar :noresize="true">
          <slot />
        </el-scrollbar>
      </div>
      <!-- dialog的底部插槽 -->
      <template #footer v-if="showFooter">
        <slot name="footer">
          <el-button @click="emitcancel" class="cancelBtn">
            {{ cancelText }}
          </el-button>
          <el-button @click="emitSave" type="primary" class="sureBtn">
            {{ submitText }}
          </el-button>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, useAttrs, watch } from "vue";

const props = withDefaults(
  defineProps<{
    visible: boolean;
    submitText?: string;
    cancelText?: string;
    // loading?: boolean,
    class?: string;
    showFooter?: boolean;
    dialogProp?: any;
  }>(),
  {
    visible: false,
    submitText: "确定",
    cancelText: "取消",
    showFooter: true
  }
);

const emit = defineEmits(["cancel", "submit", "open"]);
const state: any = reactive({
  isVisible: false
});
const { isVisible } = toRefs(state);

const elDialogRef = ref();
const attrs = useAttrs();
watch(
  () => props.visible,
  (newVal: boolean) => {
    console.log("newVal: ", newVal);
    isVisible.value = newVal;
    newVal && emit("open");
    !newVal && emit("cancel");
  }
);

watch(
  () => attrs,
  () => {
    console.log("attrs: ", attrs);
  }
);

/**
 * 保存事件
 */
function emitSave() {
  emit("submit");
}

/**
 * 关闭事件
 */
function emitcancel() {
  emit("cancel");
}
</script>
<style lang="scss" scoped>
.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style lang="scss">
.dialog {
  .el-dialog {
    min-width: 300px;
  }

  .el-overlay-dialog {
    display: flex;
    align-items: center;
  }
}

.fits-dialog {
  & {
    border-radius: 8px;
  }

  .el-dialog__body {
    overflow: hidden;
    padding: 0;

    .dialog-body {
      height: 100%;
    }
  }

  .svgicon {
    margin-right: 5px;
  }

  .el-dialog__header {
    background-color: #e1e4e8;
    border-radius: 8px 8px 0 0;
    margin-right: 0;
    padding: 12px 16px 12px 16px;
    min-height: 44px;
    box-sizing: border-box;
  }

  .el-dialog__title {
    font-size: 16px;
    color: #333333;
    line-height: normal;
  }

  .el-dialog__headerbtn {
    top: 16px;
    height: 12px;
    width: 12px;
    right: 18px;
    // margin: 8px 8px 8px 0;

    svg {
      color: #666666;
    }
  }

  .el-dialog__footer {
    padding: 10px 24px;
    border-top: 1px solid #dcdfe6;

    .el-button {
      padding: 8px 24px;
      border-radius: 0;
      height: 32px;
      font-size: 12px;
    }

    .el-button + .el-button {
      margin-left: 16px;
    }
  }

  .el-scrollbar__wrap {
    max-height: calc(90vh - 120px);
  }

  .el-scrollbar__view {
    padding: 24px 32px 20px;
  }
}
</style>
