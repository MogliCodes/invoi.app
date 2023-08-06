import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  const isUserLoggedIn = ref(false);
  const userId = ref("");
  const accessToken = ref("");

  function setUserLoggedIn(bool: boolean): void {
    isUserLoggedIn.value = bool;
  }

  function setUserId(id: string): void {
    userId.value = id;
  }

  function setAccessToken(token: string): void {
    accessToken.value = token;
  }

  return {
    isUserLoggedIn,
    userId,
    accessToken,
    setUserLoggedIn,
    setUserId,
    setAccessToken,
  };
});
