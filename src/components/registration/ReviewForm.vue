<script setup>
import { reactive, computed, defineEmits, watch, inject } from "vue";
import {
  isRequired,
  isValidCPF,
  isValidCNPJ,
  isValidDate,
  isValidPhoneNumber,
  isValidEmail,
} from "@/helpers/validation.js";
import {
  ERRORS_MESSAGE,
  FIELDS_NAME,
  FORM_TITLE,
} from "@/helpers/constants.js";
import Input from "@/components/Input.vue";
import Header from "@/components/registration/Header.vue";
import Actions from "@/components/registration/Actions.vue";

const emit = defineEmits(["handleBackStep", "handleNextStep"]);
const entity = inject("entity");

const handleBackStep = () => {
  emit("handleBackStep");
};

const props = defineProps({
  registrationData: {
    type: Object,
    default: () => ({}),
  },
});

const formData = reactive({ ...props.registrationData });
const formKeys = computed(() => Object.keys(formData));

const inputTitle = (field, document) => {
  if (FIELDS_NAME[field]) {
    return FIELDS_NAME[field];
  }
  if (document) {
    if (FIELDS_NAME[document]) {
      return FIELDS_NAME[document][field];
    }
  }
};

watch(
  () => props.registrationData,
  (newVal) => {
    Object.assign(formData, newVal);
  },
  { deep: true }
);

const formDataErrors = reactive({});

const handleNextStep = () => {
  let validForm = true;
  Object.assign(formDataErrors, {});

  Object.keys(formData).forEach((field) => {
    if (isRequired(formData[field])) {
      validForm = false;
      formDataErrors[field] = ERRORS_MESSAGE.required;
    } else if (!isValidEmail(formData[field]) && field === "mail") {
      validForm = false;
      formDataErrors[field] = ERRORS_MESSAGE.email;
    } else if (
      entity?.value === "cpf" &&
      field === "document" &&
      !isValidCPF(formData[field])
    ) {
      validForm = false;
      formDataErrors[field] = ERRORS_MESSAGE.cpf;
    } else if (
      entity?.value === "cnpj" &&
      field === "document" &&
      !isValidCNPJ(formData[field])
    ) {
      validForm = false;
      formDataErrors[field] = ERRORS_MESSAGE.cnpj;
    } else if (!isValidDate(formData[field]) && field === "birthDate") {
      validForm = false;
      formDataErrors[field] = ERRORS_MESSAGE.birthDate;
    } else if (!isValidPhoneNumber(formData[field]) && field === "phone") {
      validForm = false;
      formDataErrors[field] = ERRORS_MESSAGE.phone;
    } else {
      delete formDataErrors[field];
    }
  });

  if (!validForm) {
    return;
  }

  emit("handleNextStep", formData);
};
</script>

<template>
  <div>
    <Header :title="FORM_TITLE.review"></Header>
    <div class="review">
      <Input
        v-for="field in formKeys"
        :title="inputTitle(field, entity)"
        :modelValue="formData[field]"
        :error="formDataErrors[field]"
        @update:modelValue="($event) => (formData[field] = $event)"
      />
    </div>
    <Actions
      @handleBackStep="handleBackStep"
      @handleNextStep="handleNextStep"
    />
  </div>
</template>

<style scoped lang="scss">
.review {
  max-width: $form-width;
}
</style>
