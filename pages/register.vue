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
const regex = /^(?=.*[a-zA-Z0-9])(?=.*[\W_]).{8,}$/;
const isSufficientPassword = computed(() => regex.test(password.value));
const isPasswordVisible = ref(false);

definePageMeta({
  layout: "public",
});

const passwordInput = ref(null);
function togglePassword() {
  isPasswordVisible.value = !isPasswordVisible.value;
  console.log(passwordInput.value.$el.type);
}

async function register() {
  try {
    const { data, error } = await useFetch("/nitro/register", {
      method: "POST",
      body: {
        username,
        email,
        password,
      },
    });
    console.log(data);
    if (error.value) {
      const { statusCode, statusMessage, data } = error.value;
      // eslint-disable-next-line no-console
      console.log(statusCode, statusMessage, data);
      if (statusCode === 409) userAlreadyExists.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 5000);
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
