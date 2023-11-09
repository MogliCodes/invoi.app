import { defineStore } from "pinia";

export const useAlertStore = defineStore("alertStore", () => {
  const isActive = ref(false);
  const alertType = ref("");
  const alertMessage = ref("");

  function setAlert(type: string, message: string) {
    isActive.value = true;
    alertType.value = type;
    alertMessage.value = message;
  }

  function resetAlert() {
    isActive.value = false;
    alertType.value = "";
    alertMessage.value = "";
  }

  return {
    isActive,
    alertType,
    alertMessage,
    setAlert,
    resetAlert,
  };
});
