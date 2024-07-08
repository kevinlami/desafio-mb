<script setup>
import { inject, defineEmits } from "vue";
import Button from "@/components/Button.vue";

const currentStep = inject("steps");
const maxSteps = inject("maxSteps");
const emit = defineEmits(["handleBackStep", "handleNextStep"]);

const handleBackStep = () => {
  emit("handleBackStep");
};

const handleNextStep = () => {
  emit("handleNextStep");
};
</script>

<template>
  <div class="actions">
    <Button
      class="bt-back"
      v-if="currentStep > 1"
      :isPrimary="false"
      buttonName="Voltar"
      @click="handleBackStep"
    />
    <Button
      class="bt-next"
      :isPrimary="true"
      :buttonName="currentStep === maxSteps ? 'Cadastrar' : 'Continuar'"
      @click="handleNextStep"
    />
  </div>
</template>

<style scoped lang="scss">
.actions {
  display: flex;
  gap: 20px;
  width: 100%;

  .bt-back {
    flex: 1;
  }

  .bt-next {
    flex: 2;
  }
}
</style>
