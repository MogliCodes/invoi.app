<template>
  <section class="min-h-screen">
    <div class="flex flex-col-reverse h-full">
      <div
        class="flex h-full md:w-1/2 flex-col justify-center px-4 md:px-24 py-12 dark:bg-blue-100"
      >
        <div class="pb-12">
          <BaseHeadline
            class="mb-8 text-blue-80 dark:text-white"
            text="Einloggen"
            type="h1"
          />
          <p class="md:w-6/12 text-xl text-slate-600 dark:text-white">
            Falls du noch kein Konto hast, kannst du dich
            <NuxtLink class="text-yellow-normal" to="/register"
              >hier registrieren</NuxtLink
            >
          </p>
        </div>
        <BaseBox class="w-full">
          <div class="mb-3">
            <BaseLabel text="Benutzer" />
            <BaseInput
              v-model="username"
              :is-required="true"
              type="text"
              placeholder="Benutzer eingeben"
              error-message="Bitte gib deinen Benutzernamen ein."
            />
          </div>
          <div class="mb-3">
            <BaseLabel text="Passwort" />
            <BaseInput
              v-model="password"
              :is-required="true"
              type="password"
              placeholder="Passwort eingeben"
              error-message="Bitte gib dein Passwort ein."
            />
          </div>
          <BaseButton
            class="w-full"
            variant="yellow"
            text="Login"
            @click="login"
          />
        </BaseBox>
      </div>
      <div
        class="hidden md:flex h-full md:w-1/2 items-center md:px-12 md:pb-24"
      >
        <img src="/img/undraw_printing-invoices_osgs.svg" alt="" />
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

type Response = {
  timeToExpiration: number;
  response: {
    status: number;
    data: {
      token: string;
      id: string;
      username: string;
    };
  };
};

async function login() {
  let response: Response;
  try {
    response = await $fetch("/api/login", {
      method: "POST",
      body: {
        username: username.value,
        email: email.value,
        password: password.value,
      },
    });
    console.log(response);
    if (response.response.status === 200) {
      console.log(response.response.status);
      authStore.setAccessToken(response.response.data.token);
      authStore.setUserId(response.response.data.id);
      authStore.setUserName(response.response.data.username);
      authStore.setUserLoggedIn(true);
      authStore.setExpiration(response.timeToExpiration);
      alertStore.setAlert(
        "success",
        "🎉 You have successfully logged in. Redirecting you to your dashboard."
      );

      // Set cookie with accessToken that expires after 1 hour
      const accessToken = useCookie("accessToken", { maxAge: 3600 });

      const userId = useCookie("userId");
      accessToken.value = response.response.data.token;
      userId.value = response.response.data.id;
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
