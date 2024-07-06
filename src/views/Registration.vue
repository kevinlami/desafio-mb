<script setup>
import StepsForm from "@/components/registration/StepsForm.vue";

const submit = async (event) => {
  console.log("Event", event);
  const response = await fetch("/registration", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  const data = await response.json();

  if (data.errors) {
    Object.assign(errors, data.errors);
    return;
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
</style>
