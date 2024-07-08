<script setup>
import StepsForm from "@/components/registration/StepsForm.vue";
import { defineEmits } from "vue";
const emit = defineEmits(["message:error", "message:success"]);

const submit = async (event) => {
  try {
    const response = await fetch("/registration", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    const result = await response.json();

    if (response.status === 404) {
      emit("message:error", "Ocorreu um problema no sistema!");
    } else if (response.status === 500) {
      emit("message:error", result.message || response.statusText);
    } else if (response.status === 400) {
      emit("message:error", result.message || response.statusText);
    } else if (response.status === 200) {
      emit("message:success", result.message || response.statusText);
    }
  } catch (error) {
    emit("message:error", "Ocorreu um erro na requisição.");
  }
};
</script>

<template>
  <main>
    <StepsForm @create:registrationData="submit"></StepsForm>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: $registration-width;
  width: 100%;
  margin: 100px auto 0;
}

@media only screen and (max-width: 600px) {
  main {
    margin: 50px auto 0;
  }
}
</style>
