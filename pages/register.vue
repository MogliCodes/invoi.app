<template>
  <section class="h-screen">
    <div class="flex h-full">
      <div class="flex h-full w-1/2 flex-col justify-center px-24 py-12">
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
        <BaseBox class="flex w-full flex-col gap-3">
          <div>
            <BaseLabel text="Username" />
            <BaseInput v-model="username" placeholder="Username" />
          </div>
          <div>
            <BaseLabel text="E-Mail" />
            <BaseInput v-model="email" placeholder="E-Mail" />
          </div>
          <div>
            <BaseLabel text="Password" />
            <BaseInput
              ref="passwordInput"
              v-model="password"
              placeholder="Password"
              :type="isPasswordVisible ? 'text' : 'password'"
            />
          </div>
          <BaseButton
            class="w-full"
            variant="yellow"
            text="Register"
            @click="register"
          />
        </BaseBox>
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

const username: Ref<string> = ref("");
const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const userAlreadyExists = ref(false);
const showAlert = ref(userAlreadyExists);
const isPasswordVisible = ref(false);

definePageMeta({
  layout: "public",
});

const passwordInput = ref(null);

async function register() {
  try {
    const { error } = await useFetch("/api/register", {
      method: "POST",
      body: {
        username,
        email,
        password,
      },
    });
    if (error.value) {
      const { statusCode } = error.value;
      if (statusCode === 409) userAlreadyExists.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 5000);
    } else {
      navigateTo("/onboarding");
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
