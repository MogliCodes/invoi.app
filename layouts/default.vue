<template>
  <div class="flex flex-col sm:flex-row">
    <TheSidebar v-if="authStore.isUserLoggedIn" />
    <main class="bg-slate-100 relative w-full bg-white p-12 py-24">
      <slot />
      <BaseAlert
        v-if="alertStore.isActive"
        :message="alertStore.alertMessage"
        :type="alertStore.alertType"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const accessToken = useCookie("accessToken");
const userId = useCookie("userId");

if (accessToken.value) {
  authStore.setAccessToken(accessToken.value);
  authStore.setUserId(userId.value);
  authStore.setUserLoggedIn(true);
}
</script>
