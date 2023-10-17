<template>
  <div>
    <BaseAlert
      v-if="showAlert"
      :message="`A user with this E-Mail address already exists. Please use another one.`"
    />
    <div class="container mx-auto flex justify-center">
      <div class="flex flex-col items-center">
        <BaseHeadline
          class="mb-8"
          text="Sign up for  a free account"
          type="h1"
        />
        <div
          class="border-2-white border-2-opacity-30 rounded border-2 bg-white bg-opacity-5 p-8"
        >
          <div class="mb-3">
            <label class="block" for="username">Username</label>
            <BaseInput v-model="username" />
          </div>
          <div class="mb-3">
            <label class="block" for="username">E-Mail</label>
            <BaseInput v-model="email" />
          </div>
          <div class="mb-3">
            <label class="block" for="password">Password</label>
            <BaseInput
              ref="passwordInput"
              v-model="password"
              :type="isPasswordVisible ? 'text' : 'password'"
            />
            <p>{{ isSufficientPassword }}</p>
            <p @click="togglePassword">Show password</p>
          </div>
          <BaseButton variant="yellow" text="Register" @click="register" />
        </div>
      </div>
    </div>
  </div>
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
