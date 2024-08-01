import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  const isUserLoggedIn = ref(false);
  const userId = ref("");
  const userName = ref("");
  const accessToken = ref("");
  const expiration = ref();

  function setUserLoggedIn(bool: boolean): void {
    isUserLoggedIn.value = bool;
  }

  function setUserId(id: string): void {
    userId.value = id;
  }

  function setUserName(username: string): void {
    userName.value = username;
  }

  function setAccessToken(token: string): void {
    accessToken.value = token;
  }

  function setExpiration(exp: number): void {
    expiration.value = exp;
  }

  return {
    isUserLoggedIn,
    userId,
    userName,
    accessToken,
    expiration,
    setUserLoggedIn,
    setUserId,
    setUserName,
    setAccessToken,
    setExpiration,
  };
});
