<script setup>
import Registration from "@/views/Registration.vue";
import Popup from "@/components/Popup.vue";
import { ref } from "vue";

const popupMessage = ref("");
const popupType = ref("");
const popupVisible = ref(false);

const showSuccess = (message) => {
  popupMessage.value = message;
  popupType.value = "success";
  popupVisible.value = true;
};

const showError = (message) => {
  popupMessage.value = message;
  popupType.value = "error";
  popupVisible.value = true;
};
</script>

<template>
  <Registration
    @message:error="(message) => showError(message)"
    @message:success="(message) => showSuccess(message)"
  />
  <Popup
    :message="popupMessage"
    :type="popupType"
    :visible="popupVisible"
    @update:visible="popupVisible = $event"
  />
</template>

<style scoped></style>
