<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["click"]);

const props = defineProps({
  buttonName: {
    type: String,
  },
  isPrimary: {
    type: Boolean,
    default: true,
  },
});

const handleClick = () => {
  emit("click");
};
</script>

<template>
  <button
    class="button"
    :class="{ primary: isPrimary }"
    @click.prevent="handleClick"
  >
    {{ buttonName }}
  </button>
</template>

<style scoped lang="scss">
.button {
  width: 100%;
  max-width: 400px;
  border-radius: 5px;
  padding: 5px 0;
  font-size: 0.9em;
  cursor: pointer;

  border: 2px solid $color-primary;
  color: $color-primary;

  &.primary {
    background-color: $color-primary;
    color: $color-white;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
