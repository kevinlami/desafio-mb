<script setup>
import { ref, provide, reactive, defineEmits } from "vue";
import IdentityForm from "@/components/registration/IdentityForm.vue";
import personalInformation from "@/components/registration/personalInformation.vue";
import PasswordForm from "@/components/registration/PasswordForm.vue";
import ReviewForm from "@/components/registration/ReviewForm.vue";
const emit = defineEmits(["create:registrationData"]);

const registrationData = reactive({});
const steps = ref(1);
const maxSteps = ref(4);
const entity = ref("");

const handleNextStep = (formData) => {
  if (steps.value === maxSteps.value) {
    emit("create:registrationData", {
      documentType: entity.value,
      ...formData,
    });
  }

  if (steps.value < maxSteps.value) {
    if (formData.entity?.value) {
      entity.value = formData.entity?.value;
      delete formData.entity;
    }

    Object.assign(registrationData, {
      ...registrationData,
      ...formData,
    });

    steps.value++;
  }
};

const handleBackStep = () => {
  if (steps.value > 1) {
    steps.value--;
  }
};

provide("entity", entity);
provide("steps", steps);
provide("maxSteps", maxSteps);
</script>

<template>
  <form class="steps-form">
    <IdentityForm
      v-show="steps === 1"
      @handleBackStep="handleBackStep"
      @handleNextStep="handleNextStep"
    />

    <personalInformation
      v-show="steps === 2"
      :key="entity"
      @handleBackStep="handleBackStep"
      @handleNextStep="handleNextStep"
    />

    <PasswordForm
      v-show="steps === 3"
      @handleBackStep="handleBackStep"
      @handleNextStep="handleNextStep"
    />

    <ReviewForm
      v-show="steps === 4"
      :entity="entity"
      :registrationData="registrationData"
      @handleBackStep="handleBackStep"
      @handleNextStep="handleNextStep"
    />
  </form>
</template>

<style scoped lang="scss">
.steps-form {
  width: 100%;
}
</style>
