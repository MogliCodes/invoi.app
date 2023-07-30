<template>
  <header class="mb-8 bg-slate-900 py-2">
    <div class="container mx-auto flex justify-between">
      <div class="flex gap-16">
        <nuxt-link to="/" class="flex items-center">invoi.app</nuxt-link>
        <TheNavigation v-if="authStore.isUserLoggedIn" />
      </div>
      <NuxtLink
        v-if="!authStore.isUserLoggedIn"
        to="/login"
        class="rounded border border-white p-2 px-4 text-white"
        >Login</NuxtLink
      >
      <NuxtLink
        v-if="authStore.isUserLoggedIn"
        to="/logout"
        class="rounded border border-white p-2 px-4 text-white"
        >Logout</NuxtLink
      >
    </div>
  </header>
</template>

<script setup lang="ts">
import TheNavigation from "~/components/TheNavigation.vue";
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
</script>
