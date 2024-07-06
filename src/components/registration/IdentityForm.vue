<script setup>
import { ref, defineEmits } from "vue";
import { isRequired, isValidEmail } from "@/helpers/validation.js";
import { ERRORS_MESSAGE } from "@/helpers/constants.js";
import Input from "@/components/Input.vue";
import Header from "@/components/registration/Header.vue";
import Actions from "@/components/registration/Actions.vue";

const emit = defineEmits(["handleBackStep", "handleNextStep"]);

const mail = ref("");
const mailError = ref("");
const entity = ref("");
const entityError = ref("");

const handleBackStep = () => {
  emit("handleBackStep");
};

const handleNextStep = () => {
  let validForm = true;
  mailError.value = "";
  entityError.value = "";

  if (!isValidEmail(mail.value)) {
    validForm = false;
    mailError.value = ERRORS_MESSAGE.email;
  }

  if (isRequired(mail.value)) {
    validForm = false;
    mailError.value = ERRORS_MESSAGE.required;
  }

  if (isRequired(entity.value)) {
    validForm = false;
    entityError.value = ERRORS_MESSAGE.required;
  }

  if (!validForm) {
    return;
  }

  const formData = {
    mail,
    entity,
  };

  emit("handleNextStep", formData);
};
</script>

<template>
  <div>
    <Header title="Seja bem vindo(a)"></Header>
    <div class="entity">
      <Input
        title="Endereço de e-mail"
        type="email"
        @update:modelValue="($event) => (mail = $event)"
        :modelValue="mail"
        :error="mailError"
      />
      <div class="radio-entity" :class="{ error: entityError }">
        <span v-if="entityError" class="error-text">{{ entityError }}</span>
        <div class="content-entity">
          <Input
            title="Pessoa física"
            type="radio"
            name="entity"
            modelValue="cpf"
            @update:modelValue="($event) => (entity = $event)"
          />
          <Input
            title="Pessoa jurídica"
            type="radio"
            name="entity"
            modelValue="cnpj"
            @update:modelValue="($event) => (entity = $event)"
          />
        </div>
      </div>
    </div>
    <Actions
      @handleBackStep="handleBackStep"
      @handleNextStep="handleNextStep"
    />
  </div>
</template>

<style scoped lang="scss">
.entity {
  max-width: $form-width;

  .radio-entity {
    @include error;
    display: flex;
    flex-direction: column;

    .content-entity {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
