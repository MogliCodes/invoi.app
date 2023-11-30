import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  const isUserLoggedIn = ref(false);
  const userId = ref("");
  const accessToken = ref("");
});
