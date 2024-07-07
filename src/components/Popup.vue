<template>
  <div v-if="visible" class="popup" :class="type">
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ["success", "error"].includes(value),
  },
  visible: {
    type: Boolean,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const emits = defineEmits(["update:visible"]);

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        emits("update:visible", false);
      }, props.duration);
    }
  }
);
</script>

<style scoped>
.popup {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
  z-index: 1000;
}
.popup.success {
  background-color: #4caf50;
}
.popup.error {
  background-color: #f44336;
}
</style>
