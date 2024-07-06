<script setup>
import { ref, defineEmits } from "vue";
import { isRequired } from "@/helpers/validation.js";
import { ERRORS_MESSAGE } from "@/helpers/constants.js";
import Input from "@/components/Input.vue";
import Header from "@/components/registration/Header.vue";
import Actions from "@/components/registration/Actions.vue";

const emit = defineEmits(["handleBackStep", "handleNextStep"]);

const password = ref("");

const passwordError = ref("");

const handleBackStep = () => {
  emit("handleBackStep");
};

const handleNextStep = () => {
  let validForm = true;
  passwordError.value = "";

  if (isRequired(password.value)) {
    validForm = false;
    passwordError.value = ERRORS_MESSAGE.required;
  }

  if (!validForm) {
    return;
  }

  const formData = {
    password,
  };

  emit("handleNextStep", formData);
};
</script>

<template>
  <div>
    <Header title="Senha de acesso"></Header>
    <div class="password">
      <Input
        title="Sua senha"
        type="password"
        @update:modelValue="($event) => (password = $event)"
        :modelValue="password"
        :error="passwordError"
      />
    </div>
    <Actions
      @handleBackStep="handleBackStep"
      @handleNextStep="handleNextStep"
    />
  </div>
</template>

<style scoped lang="scss">
.password {
  max-width: $form-width;
}
</style>
