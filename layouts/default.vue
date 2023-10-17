<template>
  <div class="flex flex-col sm:flex-row">
    <TheSidebar v-if="authStore.isUserLoggedIn" />
    <main class="w-full bg-white p-12">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
const accessToken = useCookie("accessToken");
const userId = useCookie("userId");

if (accessToken.value) {
  authStore.setAccessToken(accessToken.value);
  authStore.setUserId(userId.value);
  authStore.setUserLoggedIn(true);
}
</script>
