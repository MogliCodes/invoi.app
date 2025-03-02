<template>
  <div class="pb-8">
    <TheNewHeader />
    <TheMetaMenu />
    <TheMainContent>
      <slot />
    </TheMainContent>
  </div>
</template>
<script setup lang="ts">
import TheNewHeader from "~/components/TheNewHeader.vue";
import TheMetaMenu from "~/components/TheMetaMenu.vue";
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
const accessToken = useCookie("accessToken");
const userId = useCookie("userId");

if (accessToken.value && userId.value) {
  authStore.setAccessToken(accessToken.value);
  authStore.setUserId(userId.value);
  authStore.setUserLoggedIn(true);
} else {
  navigateTo("/login");
}
</script>
