<template>
  <div class="container mx-auto">
    <div class="flex gap-8">
      <div>
        <h1 class="mb-6 text-4xl">Login</h1>
        <div class="mb-3">
          <label class="block" for="username">Username</label>
          <BaseInput v-model="username" />
        </div>
        <div class="mb-3">
          <label class="block" for="password">Password</label>
          <BaseInput v-model="password" />
        </div>
        <BaseButton text="Login" @click="login" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from "~/components/base/BaseInput.vue";
import BaseButton from "~/components/base/BaseButton.vue";
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();

const username = ref(null);
const email = ref(null);
const password = ref(null);

async function login() {
  try {
    const { data } = await useFetch("/api/login", {
      method: "POST",
      body: {
        username,
        email,
        password,
      },
    });
    authStore.setAccessToken(data.value);
    authStore.setUserLoggedIn(true);
    navigateTo("/dashboard");
  } catch (error) {
    console.error("error", error);
  }
}
</script>
