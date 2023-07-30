import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  const isUserLoggedIn = ref(false);
  const accessToken = ref("");

  function setUserLoggedIn(bool: boolean): void {
    isUserLoggedIn.value = bool;
  }

  function setAccessToken(token: string): void {
    accessToken.value = token;
  }

  return {
    isUserLoggedIn,
    accessToken,
    setUserLoggedIn,
    setAccessToken,
  };
});
