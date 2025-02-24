<script setup>
import { ref, provide, reactive, defineEmits } from "vue";
import { FORMS_STRUCTURE } from "@/helpers/formStructure.js";
import { FORM_TITLE } from "@/helpers/constants.js";
import Form from "@/components/registration/Form.vue";
const emit = defineEmits(["create:registrationData"]);

const formReview = reactive({
  title: FORM_TITLE.review,
  formFields: [],
});
const formSubmit = {};
const steps = ref(1);
const maxSteps = ref(FORMS_STRUCTURE.length + 1);

/*
Used to proceed to the next step.
Add the data to the review form and the form submit with ID:value used in the submit.
*/
const handleNextStep = (formData) => {
  if (Array.isArray(formData?.formFields)) {
    formData?.formFields.forEach((element) => {
      formSubmit[element.id] = element.value;
      if (element.review) {
        const existingIndex = formReview.formFields.findIndex((field) => {
          return field.id === element.id;
        });

        if (existingIndex !== -1) {
          formReview.formFields.splice(existingIndex, 1, element);
        } else {
          formReview.formFields.push(element);
        }
      }
    });
  }

  if (steps.value < maxSteps.value) {
    steps.value++;
  }
};

/*
Used to send the processed form data with ID:value to the registration
*/
const handleSubmitForm = () => {
  emit("create:registrationData", formSubmit);
};

/*
Used to go back one step
*/
const handleBackStep = () => {
  if (steps.value > 1) {
    steps.value--;
  }
};

provide("steps", steps);
provide("maxSteps", maxSteps);
</script>

<template>
  <form class="steps-form">
    <div v-for="(FORM, index) in FORMS_STRUCTURE" class="step">
      <Form
        v-show="steps === index + 1"
        :formStructure="FORM(formSubmit)"
        @handleBackStep="handleBackStep"
        @handleNextStep="handleNextStep"
      ></Form>
    </div>
    <div class="step-review">
      <Form
        v-show="steps === maxSteps"
        :formStructure="formReview"
        @handleBackStep="handleBackStep"
        @handleNextStep="handleSubmitForm"
      ></Form>
    </div>
  </form>
</template>

<style scoped lang="scss">
.steps-form {
  width: 100%;
}
</style>
