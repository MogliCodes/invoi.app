<template>
  <section class="h-screen">
    <div class="flex h-full">
      <div
        class="flex h-full w-1/2 flex-col justify-center px-24 py-12 dark:bg-blue-100"
      >
        <div class="w-full">
          <h1
            class="mb-6 font-syne text-4xl font-extrabold text-blue-70 dark:text-white"
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
      <div class="flex h-full w-1/2 items-center px-12 pb-24">
        <img src="/img/invoi-illu.svg" alt="" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseInput from "~/components/BaseInput/BaseInput.vue";
import BaseButton from "~/components/base/BaseButton.vue";
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";

definePageMeta({
  layout: "public",
});
const alertStore = useAlertStore();
const authStore = useAuthStore();

const username = ref(null);
const email = ref(null);
const password = ref(null);

async function login() {
  let response;
  try {
    response = await $fetch("/api/login", {
      method: "POST",
      body: {
        username: username.value,
        email: email.value,
        password: password.value,
      },
    });
    console.log("response", response);
    if (response.status === 200) {
      authStore.setAccessToken(response.data.token);
      authStore.setUserId(response.data.id);
      authStore.setUserName(response.data.username);
      authStore.setUserLoggedIn(true);
      alertStore.setAlert(
        "success",
        "🎉 You have successfully logged in. Redirecting you to your dashboard."
      );

      // Set cookie with accessToken that expires after 1 hour
      const accessToken = useCookie("accessToken", { maxAge: 3600 });

      const userId = useCookie("userId");
      accessToken.value = response.data.token;
      userId.value = response.data.id;
      navigateTo("/dashboard");
      setTimeout(() => {
        alertStore.resetAlert();
      }, 3000);
    }
  } catch (error) {
    if (error.status === 404) {
      alertStore.setAlert(
        "error",
        "Error 404: 😵 We are terribly sorry, but your login attempt failed. We could not find a user in our database."
      );
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5000);
    }
    if (error.status === 401) {
      alertStore.setAlert(
        "error",
        "Error 401: 😵 We are terribly sorry, but your login attempt failed. Please check your credentials and try again."
      );
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5000);
    }
  }
}
</script>
