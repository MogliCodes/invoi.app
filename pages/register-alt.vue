<template>
  <section class="h-screen">
    <div class="flex h-full">
      <div class="w-1/2 h-full flex items-center px-12 pb-24"></div>
      <div
        class="w-1/2 flex justify-center flex-col h-full bg-blue-100 py-12 px-24"
      >
        <div class="pb-12">
          <BaseHeadline
            class="mb-8 text-blue-80 dark:text-white"
            text="Sign up for  a free account"
            type="h1"
          />
          <p class="text-xl text-slate-600 dark:text-white w-6/12">
            If you already have an account you can
            <NuxtLink class="text-yellow-normal" to="/login"
              >login here</NuxtLink
            >
          </p>
        </div>
        <div class="w-full flex flex-col gap-3">
          <BaseInput placeholder="Username" v-model="username" />
          <BaseInput placeholder="E-Mail" v-model="email" />
          <BaseInput
            placeholder="Password"
            ref="passwordInput"
            v-model="password"
            :type="isPasswordVisible ? 'text' : 'password'"
          />
          <BaseButton
            class="w-full"
            variant="yellow"
            text="Register"
            @click="register"
          />
          <UDivider label="OR" />
        </div>
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
