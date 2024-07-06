<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  title: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});

const handleChange = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="input" :class="[type, { error: error }]">
    <span class="title">{{ title }}</span>
    <span v-if="error" class="error-text">{{ error }}</span>
    <input
      :type="type"
      :name="name"
      :value="modelValue"
      :readonly="readonly"
      @input="handleChange"
    />
  </div>
</template>

<style scoped lang="scss">
.input {
  @include error;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  input {
    border-radius: 5px;
    padding: 5px 0;
    font-size: 0.9em;
    border: 1px solid #000;
  }

  .title {
    text-align: left;
    margin-bottom: 10px;
  }

  &.radio {
    flex-direction: row;

    .title {
      order: 2;
      margin-bottom: 0;
    }
  }
}
</style>
