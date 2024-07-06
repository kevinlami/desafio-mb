<script setup>
import { inject } from "vue";

const props = defineProps({
  title: {
    type: String,
  },
});

const currentStep = inject("steps");
const maxSteps = inject("maxSteps");
</script>

<template>
  <header class="registration-header">
    <h3>
      Etapa <span>{{ currentStep }}</span> de {{ maxSteps }}
    </h3>
    <h1>{{ title }}</h1>
  </header>
</template>

<style scoped lang="scss">
.registration-header {
  margin-bottom: 30px;

  h3 {
    text-align: left;
    font-size: 1em;
    margin-bottom: 10px;

    span {
      color: $color-primary;
    }
  }

  h1 {
    text-align: left;
    font-size: 2em;
    font-weight: 600;
  }
}
</style>
