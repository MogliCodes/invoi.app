<template>
  <div>
    <header
      class="top-0 w-full bg-white px-4 py-2 shadow-lg md:fixed dark:bg-blue-90"
    >
      <div class="container mx-auto flex items-center justify-between">
        <NuxtLink
          to="/"
          class="text-md font-syne font-extrabold text-blue-90 dark:text-white"
          >invoi.app</NuxtLink
        >
        <ColorModeButton />
      </div>
    </header>
    <main
      class="h-full items-center justify-center bg-blue-50 text-white dark:bg-blue-100"
    >
      <slot />
    </main>
    <BaseAlert
      v-if="alertStore.isActive"
      :message="alertStore.alertMessage"
      :link="alertStore.alertLink"
      :type="alertStore.alertType"
    />
  </div>
</template>
<script setup lang="ts">
import { useAlertStore } from "~/stores/alert";

const alertStore = useAlertStore();
</script>
