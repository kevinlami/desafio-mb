<script setup>
import { ref, reactive, defineEmits, watch } from "vue";
import Input from "@/components/Input.vue";
import Header from "@/components/registration/Header.vue";
import Actions from "@/components/registration/Actions.vue";

const emit = defineEmits(["handleBackStep", "handleNextStep"]);

const handleBackStep = () => {
  emit("handleBackStep");
};

const props = defineProps({
  formStructure: {
    type: Object,
    default: () => ({}),
  },
});

const validForm = ref(true);
const formData = reactive({ ...props.formStructure });

watch(
  () => props.formStructure,
  (newVal) => {
    Object.assign(formData, newVal);
  },
  { deep: true }
);

/*
Iterates over the entire form executing the validation functions.
Using map to recreate the form with error messages in showError.
*/
const validationForm = () => {
  return formData.formFields.map((field) => {
    if (Array.isArray(field.errors)) {
      const foundError = field.errors.filter((error) => {
        return error.callback(field.value);
      });
      if (Array.isArray(foundError) && foundError.length > 0) {
        validForm.value = false;
        field.showError = foundError[0].message;
      } else {
        field.showError = "";
      }
    }
    return field;
  });
};

/*
Validates the form before sending the data to setForm
*/
const handleNextStep = () => {
  validForm.value = true;
  const newFormFields = validationForm();
  formData.formFields = newFormFields;

  if (!validForm.value) {
    return;
  }

  emit("handleNextStep", formData);
};
</script>

<template>
  <div class="step-content">
    <Header :title="formData.title"></Header>
    <div class="form">
      <div class="form-element" v-for="field in formData.formFields">
        <div
          v-if="field.type === 'radio'"
          class="radio-input"
          :class="{ error: field.showError }"
        >
          <span v-if="field.showError" class="error-text">{{
            field.showError
          }}</span>
          <div class="radio-content">
            <Input
              v-for="option in field.options"
              :title="option.title"
              :type="field.type"
              :name="field.id"
              :modelValue="option.value"
              @update:modelValue="($event) => (field.value = $event)"
            />
          </div>
        </div>
        <Input
          v-else
          :title="field.fieldTitle"
          :modelValue="field.value"
          :error="field.showError"
          :type="field.type"
          @update:modelValue="($event) => (field.value = $event)"
        />
      </div>
    </div>
    <Actions
      @handleBackStep="handleBackStep"
      @handleNextStep="handleNextStep"
    />
  </div>
</template>

<style scoped lang="scss">
.step-content {
  display: flex;
  flex-direction: column;
  align-items: center;

  .form {
    width: 100%;

    .radio-input {
      @include error;
      display: flex;
      flex-direction: column;

      .radio-content {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
