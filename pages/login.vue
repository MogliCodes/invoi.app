<template>
  <div class="flex h-full items-center">
    <div class="container mx-auto">
      <div class="flex justify-center gap-8">
        <div
          class="rounded border border-white border-opacity-30 bg-white bg-opacity-5 p-8"
        >
          <h1 class="mb-6 text-4xl">Login</h1>
          <div class="mb-3">
            <label class="block" for="username">Username</label>
            <BaseInput v-model="username" type="text" />
          </div>
          <div class="mb-3">
            <label class="block" for="password">Password</label>
            <BaseInput v-model="password" type="password" />
          </div>
          <BaseButton variant="yellow" text="Login" @click="login" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from "~/components/BaseInput/BaseInput.vue";
import BaseButton from "~/components/base/BaseButton.vue";
import { useAuthStore } from "~/stores/auth.store";

definePageMeta({
  layout: "public",
});

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
    authStore.setAccessToken(data.value.token);
    authStore.setUserId(data.value.id);
    authStore.setUserLoggedIn(true);
    const accessToken = useCookie("accessToken");
    accessToken.value = data.value.token;
    const userId = useCookie("userId");
    userId.value = data.value.id;
    navigateTo("/dashboard");
  } catch (error) {
    console.error("error", error);
  }
}
</script>
