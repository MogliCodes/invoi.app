<template>
  <section class="h-screen">
    <div class="flex h-full">
      <div class="flex h-full w-1/2 items-center px-12 pb-24"></div>
      <div
        class="flex h-full w-1/2 flex-col justify-center bg-blue-100 px-24 py-12"
      >
        <div class="pb-12">
          <BaseHeadline
            class="mb-8 text-blue-80 dark:text-white"
            text="Sign up for  a free account"
            type="h1"
          />
          <p class="w-6/12 text-xl text-slate-600 dark:text-white">
            If you already have an account you can
            <NuxtLink class="text-yellow-normal" to="/login"
              >login here</NuxtLink
            >
          </p>
        </div>
        <div class="flex w-full flex-col gap-3">
          <BaseInput v-model="username" placeholder="Username" />
          <BaseInput v-model="email" placeholder="E-Mail" />
          <BaseInput
            ref="passwordInput"
            v-model="password"
            placeholder="Password"
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
    const { data } = await useFetch("/login", {
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
