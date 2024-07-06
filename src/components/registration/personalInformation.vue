<script setup>
import { ref, defineEmits, inject } from "vue";
import {
  isRequired,
  isValidCPF,
  isValidCNPJ,
  isValidDate,
  isValidPhoneNumber,
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

const name = ref("");
const document = ref("");
const birthDate = ref("");
const phone = ref("");

const nameError = ref("");
const documentError = ref("");
const birthDateError = ref("");
const phoneError = ref("");

const handleNextStep = () => {
  let validForm = true;
  nameError.value = "";
  documentError.value = "";
  birthDateError.value = "";
  phoneError.value = "";

  if (entity?.value === "cpf" && !isValidCPF(document.value)) {
    validForm = false;
    documentError.value = ERRORS_MESSAGE.cpf;
  }

  if (entity?.value === "cnpj" && !isValidCNPJ(document.value)) {
    validForm = false;
    documentError.value = ERRORS_MESSAGE.cnpj;
  }

  if (!isValidDate(birthDate.value)) {
    validForm = false;
    birthDateError.value = ERRORS_MESSAGE.birthDate;
  }

  if (!isValidPhoneNumber(phone.value)) {
    validForm = false;
    phoneError.value = ERRORS_MESSAGE.phone;
  }

  if (isRequired(name.value)) {
    validForm = false;
    nameError.value = ERRORS_MESSAGE.required;
  }

  if (isRequired(document.value)) {
    validForm = false;
    documentError.value = ERRORS_MESSAGE.required;
  }

  if (isRequired(birthDate.value)) {
    validForm = false;
    birthDateError.value = ERRORS_MESSAGE.required;
  }

  if (isRequired(phone.value)) {
    validForm = false;
    phoneError.value = ERRORS_MESSAGE.required;
  }

  if (!validForm) {
    return;
  }

  const formData = {
    name,
    document,
    birthDate,
    phone,
  };

  emit("handleNextStep", formData);
};
</script>

<template>
  <div>
    <Header :title="FORM_TITLE[entity]"></Header>
    <div class="personal-information">
      <Input
        :title="FIELDS_NAME[entity]?.name"
        @update:modelValue="($event) => (name = $event)"
        :modelValue="name"
        :error="nameError"
      />
      <Input
        :title="FIELDS_NAME[entity]?.document"
        @update:modelValue="($event) => (document = $event)"
        :modelValue="document"
        :error="documentError"
      />
      <Input
        :title="FIELDS_NAME[entity]?.birthDate"
        type="date"
        @update:modelValue="($event) => (birthDate = $event)"
        :modelValue="birthDate"
        :error="birthDateError"
      />
      <Input
        :title="FIELDS_NAME[entity]?.phone"
        @update:modelValue="($event) => (phone = $event)"
        :modelValue="phone"
        :error="phoneError"
      />
    </div>
    <Actions
      @handleBackStep="handleBackStep"
      @handleNextStep="handleNextStep"
    />
  </div>
</template>

<style scoped lang="scss">
.personal-information {
  max-width: $form-width;
}
</style>
