<template>
  <div>
    <Dialog :visible="props.visible" @cancel="handleCancel"> {{ state.data }} </Dialog>
  </div>
</template>
<script lang="ts" setup>
import Dialog from "@/components/Dialog/index.vue";
import { reactive } from "vue";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(["cancel"]);
const state = reactive({
  data: "1"
});
function handleCancel() {
  emit("cancel");
}
</script>
