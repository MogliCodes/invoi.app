<template>
  <section class="h-screen">
    <div class="flex h-full">
      <div
        class="w-1/2 flex justify-center flex-col h-full dark:bg-blue-100 py-12 px-24"
      >
        <div class="w-full">
          <h1
            class="mb-6 text-4xl text-blue-70 dark:text-white font-syne font-extrabold"
          >
            Login
          </h1>
          <div class="mb-3">
            <label class="block text-gray-500 dark:text-gray-100" for="username"
              >Username</label
            >
            <BaseInput v-model="username" type="text" />
          </div>
          <div class="mb-3">
            <label class="block text-gray-500 dark:text-gray-100" for="password"
              >Password</label
            >
            <BaseInput v-model="password" type="password" />
          </div>
          <BaseButton
            class="w-full"
            variant="yellow"
            text="Login"
            @click="login"
          />
        </div>
      </div>
      <div class="w-1/2 h-full flex items-center px-12 pb-24">
        <img src="/img/invoi-illu.svg" alt="" />
      </div>
    </div>
  </section>
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
    authStore.setUserName(data.value.username);
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
