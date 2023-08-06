<template>
  <div class="flex">
    <TheSidebar v-if="authStore.isUserLoggedIn" />
    <main class="w-full p-12">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
</script>
