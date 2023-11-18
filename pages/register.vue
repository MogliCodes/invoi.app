<template>
  <section class="h-screen">
    <div class="flex h-full">
      <div class="w-1/2 flex justify-center flex-col h-full py-12 px-24">
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
      <div class="w-1/2 h-full flex items-center px-12 pb-24">
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
    const { data, error } = await useFetch("/api/register", {
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
