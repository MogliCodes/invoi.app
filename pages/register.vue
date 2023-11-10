<template>
  <section class="min-h-screen w-8/12 mx-auto pt-16">
    <BaseAlert
      v-if="showAlert"
      :message="`A user with this E-Mail address already exists. Please use another one.`"
    />
    <div class="container mx-auto">
      <div class="flex items-center gap-8">
        <div class="w-1/2">
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
        <div class="w-1/2 py-16">
          <div class="ml-auto w-3/5 flex flex-col gap-3">
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
    </div>
  </section>
</template>

<script setup lang="ts">
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
